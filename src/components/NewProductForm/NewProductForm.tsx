import React from 'react'
import './newProductForm.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NewProductScheme } from '../../schemes/NewProductScheme'
import { toast } from 'sonner'
import { TbAlertCircle } from 'react-icons/tb'
import { addProduct } from '../../service/products.service'
import { NewProductFormData } from '../../types/forms.types'

type NewProductFormParams = {
    setInventoryTab: (tab: number) => void,
  
}

const NewProductForm = ({setInventoryTab} : NewProductFormParams) => {

    const {register, handleSubmit, formState: {errors}} = useForm<NewProductFormData>({
        resolver: yupResolver(NewProductScheme)
    })

    const onSubmit = async (data: NewProductFormData) => {
        try {
            const response =  await addProduct(data);
            if(response.ok) {
                toast.success('Producto agregado con éxito');
                setInventoryTab(0);
            } else {
                const errorData = await response.json();
                toast.error(`Error al agregar el producto: ${errorData.message}`);
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

  return (
    <form id="new-product-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
            <label htmlFor="name">Nombre del producto</label>
            <input type="text" className={errors.name ? "error-input" : undefined} id="name" {...register('name')}/>
            {errors && errors.name && <p id="error-msg"><TbAlertCircle/>{errors.name?.message}</p>}
        </fieldset>
        <fieldset>
            <label htmlFor="trademark">Marca</label>
            <input type="text" id="trademark" className={errors.trademark ? "error-input" : undefined} {...register('trademark')}/>
            {errors && errors.trademark && <p id="error-msg"><TbAlertCircle/>{errors.trademark?.message}</p>}
        </fieldset>
        <fieldset>
            <label htmlFor="price">Precio</label>
            <input type="text" id="price" className={errors.price ? "error-input" : undefined} {...register('price')}/>
            {errors && errors.price && <p id="error-msg"><TbAlertCircle/>{errors.price?.message}</p>}
        </fieldset>
        <fieldset>
            <label htmlFor="stock">Cantidad de Stock</label>
            <input type="text" id="stock" className={errors.stock ? "error-input" : undefined} {...register('stock')}/>
            <p>Si no ingresa un número, se anotará como 1</p>
            {errors && errors.stock && <p id="error-msg"><TbAlertCircle/>{errors.stock?.message}</p>}
        </fieldset>
        <fieldset>
            <label htmlFor="supplier">Proveedor</label>
            <select id="supplier" className={errors.supplier ? ".rror-input" : undefined} {...register('supplier')}>
                <option value="1">Proveedor 1</option>
                <option value="2">Proveedor 2</option>
                <option value="3">Proveedor 3</option>
                <option value="4">Proveedor 4</option>
                <option value="5">Otro</option>
            </select>
            {errors && errors.supplier && <p id="error-msg"><TbAlertCircle/>{errors.supplier?.message}</p>}
        </fieldset>
        <div id="btn-container">
            <button type="submit" disabled={!errors} id="add-product">Crear Producto</button>
            <button type="button" id="cancel-btn" onClick={() => setInventoryTab(0)}>Cancelar</button>
        </div>
    </form>
  )
}

export default NewProductForm