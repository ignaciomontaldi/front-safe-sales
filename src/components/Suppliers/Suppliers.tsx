import { useEffect, useState } from 'react'
import './suppliers.css'
import { Supplier } from '../../types/suppliers.types'
import { getSuppliers } from '../../service/suppliers.service'
import SuppliersList from '../SuppliersList/SuppliersList'

const Suppliers = () => {

    const [suppliers, setSuppliers] = useState<Supplier[]>([])

    useEffect(() => {
        const fetchSuppliers = async () => {
            const clients = await getSuppliers();
            if(clients) {
                setSuppliers(suppliers)
            } else {
                console.error('Error fetching customers:')
            }
        }
        fetchSuppliers()
    },[])

  return (
    <section id="clients-view">
        <div id="clients-title">
            <h1>Proveedores</h1>
            <div id="client-btn-container">
                <button type="button" id="add-client-btn">Agregar Proveedor</button>
                <button type="button" id="edit-client-btn">Editar Proveedor</button>
            </div>
        </div>
        <div id="client-table-container">
            <SuppliersList suppliers={suppliers}/>
        </div>
    </section>
  )
}

export default Suppliers