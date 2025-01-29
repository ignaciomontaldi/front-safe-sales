import { API_URL } from "../constants/api";

const CUSTOMERS_ENDPOINT = 'customers';

export const getCustomers = async () => {
    try {
        const response = await fetch(`${API_URL}${CUSTOMERS_ENDPOINT}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            return data.data;
        }
    } catch (error) {
        
    }
}