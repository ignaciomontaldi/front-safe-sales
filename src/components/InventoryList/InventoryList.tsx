import { toast } from "sonner";
import { useEditField } from "../../hooks/useEditField";
import { deleteProductById } from "../../service/products.service";
import { Product } from "../../types/product.types";

type InventoryListParams = {
    products: Product[];
    firstIndex: number;
    lastIndex: number;
    setEditProduct: (product: Product | null) => void;
  };

const InventoryList = ({ products, firstIndex, lastIndex, setEditProduct } : InventoryListParams) => {

  const currentProducts = products.slice(firstIndex, lastIndex);
  const {change, setChange} = useEditField();

  const eraseProduct = async (id: string) => {
    const response = await deleteProductById(id);
    if(response.ok) {
      toast.success('Producto eliminado con éxito.');
      setChange(false);
      setEditProduct(null);
    } else {
      toast.error('Error al eliminar el producto. Intente nuevamente.');
    }
  }

  return (
    <>
      {!products && <p>No hay productos en el inventario.</p>}

      {products.length > 0 && (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>En Stock</th>
              <th>Proveedor</th>
              {change && <th id="edit-product-field" className="text-sm">Seleccione uno para modificar</th>}
              {change && <th id="erase-product-field" className="text-sm">Eliminar un producto</th>}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.trademark}</td>
                  <td>${product.price}</td>
                  <td>{product.available ? product.stock : 'Sin Stock'}</td>
                  <td>{product.supplier}</td>
                  {change && <td id="edit-btn-field" onClick={()=>setEditProduct(product)}><button className="font-semibold">Seleccionar</button></td>}
                  {change && <td id="erase-btn-field"><button className="font-semibold" onClick={() => eraseProduct(product.id)}>Eliminar</button></td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      
    </>
  );
};

export default InventoryList;
