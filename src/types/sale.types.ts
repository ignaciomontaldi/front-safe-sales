export interface Sale {
    id:          string;
    totalAmount: string;
    totalItems:  string;
    status:      string;
    payment:     string;
    createdAt:   string;
    paidAt:      string;
    products:    Producto[];
}

export interface Producto {
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
