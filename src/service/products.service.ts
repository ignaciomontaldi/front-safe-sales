import { API_URL } from "../constants/api";
import { NewProductFormData } from "../types/forms.types";

export const PRODUCTS_ENDPOINT = "products";

// GET Methods

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}${PRODUCTS_ENDPOINT}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const data = await response.json();
        return data.data;
    }
  } catch (error) {
    throw new Error("Could not reach server");
  }
};

export const addProduct = async (product:NewProductFormData) => {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  };
  return fetch(`${API_URL}${PRODUCTS_ENDPOINT}`, options);
}
