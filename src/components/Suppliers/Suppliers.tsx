import { useEffect, useState } from "react";
import "./suppliers.css";
import { Supplier } from "../../types/suppliers.types";
import { getSuppliers } from "../../service/suppliers.service";
import SuppliersList from "../SuppliersList/SuppliersList";
import CreateSupplierForm from "../CreateSupplierForm/CreateSupplierForm";
import { useLoading } from "../../hooks/useLoading";
import Loading from "../Loading/Loading";

const Suppliers = () => {

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [suppliersView, setSuppliersView] = useState<number>(0);
  const {load, setLoad} = useLoading();

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoad(true);
      const response = await getSuppliers();
      if (response) {
        setSuppliers(response);
        setLoad(false);
      } else {
        console.error("Error fetching suppliers");
        setLoad(false);
      }
    };
    fetchSuppliers();
  }, []);

  return (
    <section id="suppliers-view">
      {suppliersView === 0 && (
        <>
          <div id="suppliers-title">
            <h1>Proveedores</h1>
            <div id="supplier-btn-container">
              <button
                type="button"
                id="add-supplier-btn"
                onClick={() => setSuppliersView(1)}
              >
                Agregar Proveedor
              </button>
              <button type="button" id="edit-supplier-btn">
                Editar Proveedor
              </button>
            </div>
          </div>
          <Loading message="Cargando expensas..."/>
          {suppliers.length > 0 ? <div id="supplier-table-container" className={load ? 'hidden' : 'block'}>
            <SuppliersList suppliers={suppliers} />
          </div> : <p className={load ? 'hidden' : 'mt-20 text-center text-lg text-softBlack font-bold'}>No se cargaron proveedores</p>}
        </>
      )}
      {suppliersView === 1 && <CreateSupplierForm setSuppliersView={setSuppliersView} />}
    </section>
  );
};

export default Suppliers;
