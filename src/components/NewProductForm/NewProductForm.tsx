import React from 'react'
import './newProductForm.css'

type NewProductFormParams = {
    setInventoryTab: (tab: number) => void,
  
}
const NewProductForm = ({setInventoryTab} : NewProductFormParams) => {
  return (
    <form id="new-product-form">
        <fieldset>
            <label htmlFor="productName">Nombre del producto</label>
            <input type="text" name="productName" id="productname" />
        </fieldset>
        <fieldset>
            <label htmlFor="trademark">Marca</label>
            <input type="text" name="trademark" id="trademark" />
        </fieldset>
        <fieldset>
            <label htmlFor="price">Precio</label>
            <input type="text" name="price" id="price" />
        </fieldset>
        <fieldset>
            <label htmlFor="stock">Cantidad de Stock</label>
            <input type="text" name="stock" id="stock" />
            <p>Si no ingresa un número, se anotará como 1</p>
        </fieldset>
        <fieldset>
            <label htmlFor="supplier">Proveedor</label>
            <select name="supplier" id="supplier">
                <option value="1">Proveedor 1</option>
                <option value="2">Proveedor 2</option>
                <option value="3">Proveedor 3</option>
                <option value="4">Proveedor 4</option>
                <option value="5">Otro</option>
            </select>
        </fieldset>
        <div id="btn-container">
            <button type="button" id="add-product">Crear Producto</button>
            <button type="button" id="cancel-btn" onClick={() => setInventoryTab(0)}>Cancelar</button>
        </div>
    </form>
  )
}

export default NewProductForm