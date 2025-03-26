import { API_URL } from "../constants/api";
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
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(`${API_URL}${SUPPLIER_ENDPOINT}`, options);
  }