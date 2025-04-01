import { API_URL } from "../constants/api";
import { EditProductFormData, NewProductFormData } from "../types/forms.types";

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

// CRUD Methods

export const addProduct = async (product:NewProductFormData) => {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  };
  return fetch(`${API_URL}${PRODUCTS_ENDPOINT}`, options);
}

export const editProductById = async (data:EditProductFormData) => {
  const body = JSON.stringify({
    name: data.name,
    trademark: data.trademark,
    price: data.price,
    stock: data.stock,
    supplier: data.supplier,
  });
  const options: RequestInit = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body,
  };
  return fetch(`${API_URL}${PRODUCTS_ENDPOINT}/${data.id}`, options);
}

export const deleteProductById = async (id: string) => {
  const options: RequestInit = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${API_URL}${PRODUCTS_ENDPOINT}/${id}`, options);
}
