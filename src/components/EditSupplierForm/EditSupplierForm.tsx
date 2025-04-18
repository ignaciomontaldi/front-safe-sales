import { Supplier } from '../../types/suppliers.types';
import { useLoading } from '../../hooks/useLoading';
import Loading from '../Loading/Loading';
import { TbAlertCircle } from 'react-icons/tb';
import { EditSupplierScheme } from '../../schemes/EditSupplierScheme';
import './editSupplierForm.css';
import { useForm } from 'react-hook-form';
import { EditSupplierFormData } from '../../types/forms.types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEditField } from '../../hooks/useEditField';
import { useEffect } from 'react';
import { editSupplier } from '../../service/suppliers.service';
import { toast } from 'sonner';

type EditSupplierFormParams = {
    supplier: Supplier;
    setEditSupplier: (supplier: Supplier | null) => void;
    setSupplierView: (view: number) => void;
}

function EditSupplierForm({supplier, setEditSupplier, setSupplierView} : EditSupplierFormParams) {
    const {load, setLoad} = useLoading();
    const {setChange} = useEditField();
    const {register, handleSubmit, formState: {errors}} = useForm<EditSupplierFormData>({
        resolver: yupResolver(EditSupplierScheme),
        defaultValues: {
            id: supplier.id,
        },
    });

  useEffect(() => {
      setLoad(true);
      if (!supplier) {
        setSupplierView(0);
      }
      setLoad(false);
  }, [supplier, setSupplierView, setLoad]);

    const onSubmit = async (data: EditSupplierFormData) => {
        const response = await editSupplier(data);
        if (response.ok) {
            toast.success('Proveedor actualizado correctamente');
            setEditSupplier(null);
            setChange(false);
            setSupplierView(0);
        } else {
            toast.error("Error al editar el proveedor");
        }
    }

    const cancelEdit = () => {
        setChange(false);
        setEditSupplier(null);
        setSupplierView(0);
    }

    return (
        <>
          {supplier && (
            <>
              <h1 className="my-2 text-2xl font-bold text-softBlack">
                Actualizar Proveedor
              </h1>
              <Loading message="Cargando datos del proveedor..."/>
              {!load && <>
                <form id="edit-client-form" onSubmit={handleSubmit(onSubmit)}>
                <div id="form-group">
                  <label htmlFor="name">Nombre del proveedor</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={supplier.name}
                    {...register("name")}
                  />
                  {errors && errors?.name && <div id="error-container">
                    <TbAlertCircle />
                    <p id="error-msg">{errors.name.message}</p>
                  </div>}
                </div>
                <div id="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="number"
                    id="phone"
                    defaultValue={supplier.phone}
                    {...register("phone")}
                  />
                  {errors && errors.phone && <div id="error-container">
                    <TbAlertCircle />
                    <p id="error-msg">{errors.phone.message}</p>
                  </div>}
                </div>
                <div id="form-group">
                  <label htmlFor="product">Producto</label>
                  <input
                    type="text"
                    id="product"
                    defaultValue={supplier.products}
                    {...register("products")}
                  />
                  {errors && errors.products && <div id="error-container">
                    <TbAlertCircle />
                    <p id="error-msg">{errors.products.message}</p>
                  </div>}
                </div>
                <div id="btn-container">
                  <button type="submit" id="edit-btn">
                    Actualizar Proveedor
                  </button>
                  <button type="button" id="cancel-btn" onClick={cancelEdit}>
                    Cancelar
                  </button>
                </div>
              </form>
              </>}
            </>
          )}
        </>
      );
}

export default EditSupplierForm