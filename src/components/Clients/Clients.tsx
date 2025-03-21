import { useEffect, useState } from 'react'
import ClientList from '../ClientList/ClientList'
import { Customer } from '../../types/customers.types'
import { getCustomers } from '../../service/customers.service'
import './clients.css'

const Clients = () => {

    const [clients, setClients] = useState<Customer[]>([])

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
        <div id="clients-title">
            <h1>Clientes</h1>
            <div id="client-btn-container">
                <button type="button" id="add-client-btn">Crear Cliente</button>
                <button type="button" id="edit-client-btn">Editar Cliente</button>
            </div>
        </div>
        <div id="client-table-container">
            <ClientList clients={clients}/>
        </div>
    </section>
  )
}

export default Clients