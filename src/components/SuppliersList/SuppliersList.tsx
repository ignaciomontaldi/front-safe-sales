import { Supplier } from "../../types/suppliers.types";
type SuppliersListParams = {
    suppliers: Supplier[];
}

const SuppliersList = ({suppliers} : SuppliersListParams) => {
  return (
    <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Producto</th>
          </tr>
        </thead>
        <tbody>
            {
                suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                        <td>{supplier.name}</td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.products}</td>
                    </tr>
                ))
            }
        </tbody>
      </table>
  )
}

export default SuppliersList