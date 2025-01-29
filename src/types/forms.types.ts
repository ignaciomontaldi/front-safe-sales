import { ProductData } from "./product.types";

export type NewProductFormData = {
    name: string;
    trademark: string;
    price: number;
    stock?: number;
    supplier: string;
}

export type CreateSaleFormData = {
    productList?: ProductData[];
    customer: string;
    payment: string;
  };