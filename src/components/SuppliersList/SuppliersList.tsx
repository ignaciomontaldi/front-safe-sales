import { Supplier } from "../../types/suppliers.types";
type SuppliersListParams = {
    suppliers: Supplier[];
}

const SuppliersList = ({suppliers} : SuppliersListParams) => {
  return (
    <table id="clients-table">
        <thead id="clients-header">
          <tr id="clients-tr">
            <th id="clients-th">Nombre</th>
            <th id="clients-th">Teléfono</th>
            <th id="clients-th">Producto</th>
          </tr>
        </thead>
        <tbody id="clients-body">
            {
                suppliers.map((supplier) => (
                    <tr id="clients-tr" key={supplier.id}>
                        <td id="clients-td">{supplier.name}</td>
                        <td id="clients-td">{supplier.phone}</td>
                        <td id="clients-td">{supplier.products}</td>
                    </tr>
                ))
            }
        </tbody>
      </table>
  )
}

export default SuppliersList