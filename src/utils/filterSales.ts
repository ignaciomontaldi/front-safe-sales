import { Sale } from "../types/sale.types";

export function filterSales(sales: Sale[], filterValue: string) {
    switch (filterValue) {
        case "price-desc":
            return [...sales].sort((sale1, sale2) => { return sale2.total - sale1.total })

        case "price-asc":
            return [...sales].sort((sale1, sale2) => { return sale1.total - sale2.total })

        case "date-desc": {
            return [...sales].sort((sale1, sale2) => { return new Date(sale2.date).getTime() - new Date(sale1.date).getTime() });
        }

        case "date-asc": {
            return [...sales].sort((sale1, sale2) => { return new Date(sale1.date).getTime() - new Date(sale2.date).getTime() });
        }

        case "transfers": {
            const transferSales = [...sales].filter(sale => sale.payment === "Transferencia");
            return transferSales.sort((sale1, sale2) => { return sale2.total - sale1.total })
        }

        case "debit": {
            const debitSales = [...sales].filter(sale => sale.payment === "Débito");
            return debitSales.sort((sale1, sale2) => { return sale2.total - sale1.total })
        }

        case "credit": {
            const creditSales = [...sales].filter(sale => sale.payment === "Crédito");
            return creditSales.sort((sale1, sale2) => { return sale2.total - sale1.total })
        }

        case "cash": {
            const cashSales = [...sales].filter(sale => sale.payment === "Efectivo");
            return cashSales.sort((sale1, sale2) => { return sale2.total - sale1.total })
        }

        default:
            return [...sales];

    }
}