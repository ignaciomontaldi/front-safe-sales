import { Product } from "./product.types";

export interface Sale {
    id:          string;
    totalAmount: string;
    totalItems:  string;
    status:      string;
    payment:     string;
    createdAt:   string;
    paidAt:      string;
    products:    Product[];
}


