import { API_URL } from "../constants/api";

export const PRODUCTS_ENDPOINT = "products";

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
