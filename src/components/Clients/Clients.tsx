import { useEffect, useState } from 'react'
import ClientList from '../ClientList/ClientList'
import { Customer } from '../../types/customers.types'
import { getCustomers } from '../../service/customers.service'
import './clients.css'
import NewClientForm from '../NewClientForm/NewClientForm'
import { useLoading } from '../../hooks/useLoading'
import Loading from '../Loading/Loading'

const Clients = () => {

    const [clients, setClients] = useState<Customer[]>([])
    const [clientView, setClientView] = useState<number>(0);
    const {load, setLoad} = useLoading();

    useEffect(() => {
        const fetchClients = async () => {
            setLoad(true);
            const clients = await getCustomers();
            if(clients) {
                setClients(clients)
                setLoad(false);
            } else {
                console.error('Error fetching customers:', clients.statusText)
                setLoad(false);
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
        <Loading message='Cargando clientes...'/>
        <div id="client-table-container" className={load ? 'hidden' : 'block'}>
            <ClientList clients={clients}/>
        </div>
        </>}
        {clientView === 1 && <NewClientForm setClientView={setClientView}/>}
    </section>
  )
}

export default Clients