import { Sale } from "../../types/sale.types";
import SaleDetail from "../SaleDetail/SaleDetail"

type SalesTableParams = {
    salesList: Sale[];
}

function SalesTable({salesList}:SalesTableParams) {

  return (
    <>
        {salesList.length > 0 ? <table id="sales-table">
            <thead id="sales-header">
            <tr id="sales-tr">
                <th id="sales-th">Fecha</th>
                <th id="sales-th">Productos</th>
                <th id="sales-th">Total</th>
                <th id="sales-th">Pago</th>
            </tr>
            </thead>
            <tbody>
            { salesList.length > 0 && salesList.map((sale:Sale, index:number) => (
                <tr id="sales-tr" key={index}>
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