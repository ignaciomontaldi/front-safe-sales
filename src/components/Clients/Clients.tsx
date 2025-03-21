import { useEffect, useState } from 'react'
import ClientList from '../ClientList/ClientList'
import { Customer } from '../../types/customers.types'
import { getCustomers } from '../../service/customers.service'
import './clients.css'
import NewClientForm from '../NewClientForm/NewClientForm'

const Clients = () => {

    const [clients, setClients] = useState<Customer[]>([])
    const [clientView, setClientView] = useState<number>(0);

    useEffect(() => {
        const fetchClients = async () => {
            const clients = await getCustomers();
            if(clients) {
                setClients(clients)
            } else {
                console.error('Error fetching customers:', clients.statusText)
            }
        }
        fetchClients()
    },[])

  return (
    <section id="clients-view">
        {clientView === 0 && <>
            <div id="clients-title">
            <h1>Clientes</h1>
            <div id="client-btn-container">
                <button type="button" id="add-client-btn" onClick={() => setClientView(1)}>Crear Cliente</button>
                <button type="button" id="edit-client-btn">Editar Cliente</button>
            </div>
        </div>
        <div id="client-table-container">
            <ClientList clients={clients}/>
        </div>
        </>}
        {clientView === 1 && <NewClientForm setClientView={setClientView}/>}
    </section>
  )
}

export default Clients