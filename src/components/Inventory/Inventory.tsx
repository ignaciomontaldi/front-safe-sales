import { useEffect, useState } from "react";
import { Product } from "../../types/product.types";
import "./inventory.css";
import { getProducts } from "../../service/products.service";
import Loading from "../Loading/Loading";
import { useLoading } from "../../hooks/useLoading";
import InventoryList from "../InventoryList/InventoryList";
import NewProductForm from "../NewProductForm/NewProductForm";
import { Toaster } from "sonner";
import { useEditField } from "../../hooks/useEditField";
import EditProductForm from "../EditProductForm/EditProductForm";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inventoryView, setInventoryView] = useState<number>(0);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const { setLoad } = useLoading();
  const { change, setChange } = useEditField();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoad(true);
      try {
        const result = await getProducts();
        setProducts(result);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        throw new Error("Error fetching products");
      }
    };
    fetchProducts();
  }, [inventoryView]);

  const handlePageChange = (pageNumber: number) => {
    setLoad(true);
    setCurrentPage(pageNumber);
    setLoad(false);
  };

  return (
    <section className="inventory-view">
      <Toaster richColors />
      {!editProduct && (
        <>
          <div className="table-container">
            <span className="title-container">
              <h1>
                {inventoryView === 0 ? "Inventario" : "Agregar un Producto"}
              </h1>
              {inventoryView === 0 && (
                <>
                  <div className="btn-container">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => setChange(!change)}
                    >
                      Editar Productos
                    </button>
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() => setInventoryView(1)}
                    >
                      Agregar un Producto
                    </button>
                  </div>
                </>
              )}
            </span>
            {inventoryView === 0 && (
              <>
                <Loading message="Cargando productos..." />
                <InventoryList
                  products={products}
                  firstIndex={firstIndex}
                  lastIndex={lastIndex}
                  setEditProduct={setEditProduct}
                />
              </>
            )}
            {inventoryView === 1 && (
              <NewProductForm setInventoryTab={setInventoryView} />
            )}
          </div>
          {inventoryView === 0 && (
            <div className="pages-container">
              {Array.from({ length: totalPages }, (_, index) => (
                <p
                  key={index + 1}
                  className={
                    currentPage === index + 1 ? "bg-darkGray" : undefined
                  }
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </p>
              ))}
            </div>
          )}
        </>
      )}
      {editProduct && <>
        <EditProductForm product={editProduct} setEditProduct={setEditProduct} setInventoryView={setInventoryView}/>
      </>}
    </section>
  );
};

export default Inventory;
