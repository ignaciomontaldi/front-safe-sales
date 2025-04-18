import { toast } from "sonner";
import { useEditField } from "../../hooks/useEditField";
import { deleteSupplier } from "../../service/suppliers.service";
import { Supplier } from "../../types/suppliers.types";
type SuppliersListParams = {
  suppliers: Supplier[];
  setEditSupplier: (supplier: Supplier) => void;
};

const SuppliersList = ({ suppliers, setEditSupplier }: SuppliersListParams) => {
  const { change } = useEditField();
  const handleDelete = async (id: string) => {
    const response = await deleteSupplier(id);
    if (response.ok) {
      toast.success("Proveedor eliminado correctamente");
    } else {
      toast.error("Error al eliminar el proveedor");
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Producto</th>
          {change && (
            <th className="text-sm" id="edit-field">
              Editar proveedor
            </th>
          )}
          {change && (
            <th className="text-sm" id="erase-field">
              Eliminar proveedor
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier.id}>
            <td>{supplier.name}</td>
            <td>{supplier.phone}</td>
            <td>{supplier.products}</td>
            {change && (
              <td id="edit-btn-field">
                <button
                  type="button"
                  className="font-semibold"
                  id="edit-btn"
                  onClick={() => setEditSupplier(supplier)}
                >
                  Editar
                </button>
              </td>
            )}
            {change && (
              <td id="erase-btn-field">
                <button type="button" className="font-semibold" id="erase-btn" onClick={() => handleDelete(supplier.id)}>
                  Eliminar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SuppliersList;
