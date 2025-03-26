export interface Supplier {
  id: string;
  name: string;
  phone: number;
  products: string;
  status: boolean;
  createdAt: string;
  updateAt: string;
}

export type CreateSupplierFormData = {
  name: string;
  phone: number;
  products: string;
}
