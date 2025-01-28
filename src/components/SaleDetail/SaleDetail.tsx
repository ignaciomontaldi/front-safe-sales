import { useEffect, useState } from 'react';
import { Sale } from '../../types/sale.types';
import { getSaleByID } from '../../service/sales.service';

type SaleDetailParams = {
    saleInfo: Sale;
}

function SaleDetail({saleInfo} : SaleDetailParams) {
    const [sale, setSale] = useState<Sale>();
    useEffect(()=> {
        const fetchSale = async () => {
            try {
                const response = await getSaleByID(saleInfo.id);
                setSale(response)
            } catch (error) {
                throw new Error('Error fetching sale')
            }
        }
        fetchSale();
    },[saleInfo])
    return (
        <>
            <td>{sale?.createdAt}</td>
            <td>{sale?.products.map(product => product.name)}</td>
            <td>$ {saleInfo.totalAmount}</td>
            <td>{saleInfo.payment}</td>
        </>
    )
}

export default SaleDetail