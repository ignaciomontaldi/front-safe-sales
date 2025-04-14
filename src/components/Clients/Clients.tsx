import { useEffect, useState } from 'react'
import ClientList from '../ClientList/ClientList'
import { Customer } from '../../types/customers.types';
import { getCustomers } from '../../service/customers.service'
import NewClientForm from '../NewClientForm/NewClientForm'
import  EditClientForm  from '../EditClientForm/EditClientForm'
import { useLoading } from '../../hooks/useLoading'
import Loading from '../Loading/Loading'
import { useEditField } from '../../hooks/useEditField'
import './clients.css'
import { Toaster } from 'sonner';

const Clients = () => {

    const [clients, setClients] = useState<Customer[]>([])
    const [clientView, setClientView] = useState<number>(0);
    const [editClient, setEditClient] = useState<Customer | null>(null);
    const {load, setLoad} = useLoading();
    const {change, setChange} = useEditField();

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
        <Toaster richColors visibleToasts={1}/>
        {!editClient && <>
            {clientView === 0 && <>
            <div id="clients-title">
            <h1>Clientes</h1>
            <div id="client-btn-container">
                <button type="button" id="add-client-btn" onClick={() => setClientView(1)}>Crear Cliente</button>
                <button type="button" id="edit-client-btn" onClick={() => setChange(!change)}>Editar Cliente</button>
            </div>
        </div>
        <Loading message='Cargando clientes...'/>
        <div id="client-table-container" className={load ? 'hidden' : 'block'}>
            <ClientList clients={clients} setEditClient={setEditClient}/>
        </div>
        </>}
        {clientView === 1 && <NewClientForm setClientView={setClientView}/>}
        </>}
        {editClient && <EditClientForm customer={editClient} setEditClient={setEditClient} setClientView={setClientView}/>}
    </section>
  )
}

export default Clients