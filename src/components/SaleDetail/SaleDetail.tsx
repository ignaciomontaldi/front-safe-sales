import { Sale } from '../../types/sale.types';

type SaleDetailParams = {
    saleInfo: Sale;
}

function SaleDetail({saleInfo} : SaleDetailParams) {
    return (
        <>
            <td>{saleInfo.date}</td>
            <td>{saleInfo.products}</td>
            <td>{saleInfo.total}</td>
            <td>{saleInfo.payment}</td>
        </>
    )
}

export default SaleDetail