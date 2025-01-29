export interface Product {
    id:        string;
    name:      string;
    price:     string;
    stock:     string;
    supplier:  string;
    trademark: string;
    createdAt: string;
    updatedAt: string;
    available: boolean;
}

export type ProductData = {
    name: string;
    // price: number;
    quantity: number;
  };