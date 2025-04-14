import { toast } from "sonner";
import { useEditField } from "../../hooks/useEditField";
import { deleteCostumerById } from "../../service/customers.service";
import { Customer } from "../../types/customers.types";

type ClientListParams = {
    clients: Customer[],
    setEditClient: (client: Customer | null) => void,
}

const ClientList = ({clients, setEditClient} : ClientListParams) => {
  const {change, setChange} = useEditField();

  const eraseClient = async (id: string) => {
    const response = await deleteCostumerById(id);
    if(response.ok) {
      toast.success('Cliente eliminado con éxito.');
      setChange(false);
      setEditClient(null);
    } else {
      toast.error('Error al eliminar el cliente. Intente nuevamente.');
    }
  }

  return (
    <table id="clients-table">
        <thead id="clients-header">
          <tr>
            <th>Nombre Completo</th>
            <th>Teléfono</th>
            <th>Frecuencia</th>
            <th>Cant. de Compras</th>
            {change && <th id="edit-field" className="text-sm">Editar Cliente</th>}
            {change && <th id="erase-field" className="text-sm">Eliminar Cliente</th>}
          </tr>
        </thead>
        <tbody id="clients-body">
            {
                clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.fullname}</td>
                        <td>{client.phone}</td>
                        <td>{client.frequency}</td>
                        <td>{client.purchases}</td>
                        {change && <td id="edit-btn-field" onClick={()=>setEditClient(client)}><button className="font-semibold">Editar</button></td>}
                        {change && <td id="erase-btn-field" onClick={() => eraseClient(client.id)}><button className="font-semibold">Eliminar</button></td>}
                    </tr>
                ))
            }
        </tbody>
      </table>
  )
}

export default ClientList