import { Customer } from "../../types/customers.types";
type ClientListParams = {
    clients: Customer[];
}

const ClientList = ({clients} : ClientListParams) => {
  return (
    <table id="clients-table">
        <thead id="clients-header">
          <tr id="clients-tr">
            <th id="clients-th">Nombre Completo</th>
            <th id="clients-th">Teléfono</th>
            <th id="clients-th">Frecuencia</th>
            <th id="clients-th">Cant. de Compras</th>
          </tr>
        </thead>
        <tbody id="clients-body">
            {
                clients.map((client) => (
                    <tr id="clients-tr" key={client.id}>
                        <td id="clients-td">{client.fullname}</td>
                        <td id="clients-td">{client.phone}</td>
                        <td id="clients-td">{client.frequency}</td>
                        <td id="clients-td">{client.purchases}</td>
                    </tr>
                ))
            }
        </tbody>
      </table>
  )
}

export default ClientList