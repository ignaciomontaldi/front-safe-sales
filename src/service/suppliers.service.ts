import { API_URL } from "../constants/api";
import { EditSupplierFormData } from "../types/forms.types";
import { CreateSupplierFormData } from "../types/suppliers.types";

const SUPPLIER_ENDPOINT = 'suppliers'

export const getSuppliers = async () => {
      try {
        const response = await fetch(`${API_URL}${SUPPLIER_ENDPOINT}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            return data.data;
        }
  } catch (error) {
    throw new Error("Could not reach server");
  }
}

  export const createSupplier = async (data : CreateSupplierFormData) => {
    
    const body = JSON.stringify({
      name: data.name,
      phone: data.phone,
      products: data.products,
    });

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    };

    return fetch(`${API_URL}${SUPPLIER_ENDPOINT}`, options);
  }

  export const editSupplier = async (data: EditSupplierFormData) => {

    const body = JSON.stringify({
      name: data.name,
      phone: data.phone,
      products: data.products,
    });

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    };

    return fetch(`${API_URL}${SUPPLIER_ENDPOINT}/${data.id}`, options);
  }

  export const deleteSupplier = async (id: string) => {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return fetch(`${API_URL}${SUPPLIER_ENDPOINT}/${id}`, options);
  }