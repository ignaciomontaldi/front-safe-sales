import { Sale } from "../types/sale.types";

export function filterSales(sales: Sale[], filterValue: string) {
    switch (filterValue) {
        case "price-desc":
            return [...sales].sort((sale1, sale2) => { return Number(sale2.totalAmount) - Number(sale1.totalAmount) })

        case "price-asc":
            return [...sales].sort((sale1, sale2) => { return Number(sale1.totalAmount) - Number(sale2.totalAmount) })

        case "date-desc": {
            return [...sales].sort((sale1, sale2) => { return new Date(sale2.createdAt).getTime() - new Date(sale1.createdAt).getTime() });
        }

        case "date-asc": {
            return [...sales].sort((sale1, sale2) => { return new Date(sale1.createdAt).getTime() - new Date(sale2.createdAt).getTime() });
        }

        case "transfers": {
            const transferSales = [...sales].filter(sale => sale.payment === "TRANSFERENCIA");
            return transferSales.sort((sale1, sale2) => { return Number(sale2.totalAmount) - Number(sale1.totalAmount) })
        }

        case "debit": {
            const debitSales = [...sales].filter(sale => sale.payment === "DEBITO");
            return debitSales.sort((sale1, sale2) => { return Number(sale2.totalAmount) - Number(sale1.totalAmount) })
        }

        case "credit": {
            const creditSales = [...sales].filter(sale => sale.payment === "CREDITO");
            return creditSales.sort((sale1, sale2) => { return Number(sale2.totalAmount) - Number(sale1.totalAmount) })
        }

        case "cash": {
            const cashSales = [...sales].filter(sale => sale.payment === "EFECTIVO");
            return cashSales.sort((sale1, sale2) => { return Number(sale2.totalAmount) - Number(sale1.totalAmount) })
        }

        case "qr": {
            const qrSales = [...sales].filter(sale => sale.payment === "QR");
            return qrSales.sort((sale1, sale2) => { return Number(sale2.totalAmount) - Number(sale1.totalAmount) })
        }

        default:
            return [...sales];

    }
}