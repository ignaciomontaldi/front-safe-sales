import { Sale } from "../../types/sale.types";
import SaleDetail from "../SaleDetail/SaleDetail"
import "./salesTable.css"

type SalesTableParams = {
    salesList: Sale[];
}

function SalesTable({salesList}:SalesTableParams) {

  return (
    <>
        {salesList.length > 0 ? <table>
            <thead>
            <tr>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Pago</th>
            </tr>
            </thead>
            <tbody>
            { salesList.length > 0 && salesList.map((sale:Sale, index:number) => (
                <tr key={index}>
                    <SaleDetail saleInfo={sale}/>
                </tr>
            ))
            }
            
            </tbody>
        </table> : <h2 className="mt-10 text-center font-semibold text-softBlack">No hay registros de ventas</h2>}
    </>
  )
}

export default SalesTable