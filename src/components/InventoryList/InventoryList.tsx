import { InventoryProduct } from "../../types/product.types";

type InventoryListParams = {
    products: InventoryProduct[];
    firstIndex: number;
    lastIndex: number;
  };

const InventoryList = ({ products, firstIndex, lastIndex } : InventoryListParams) => {

  const currentProducts = products.slice(firstIndex, lastIndex);

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
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.trademark}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.supplier}</td>
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
