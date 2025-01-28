import { API_URL } from "../constants/api";

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