import { API_URL } from "../constants/api";
import { CreateClientFormData } from "../types/forms.types";

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
        throw new Error(`HTTP error! status: ${error}`);
    }
}

export const createCostumer = async (data : CreateClientFormData) => {
    const body = JSON.stringify({
        fullname: data.fullname,
        frequency: data.frequency,
        phone: Number(data.phone),
    });
    const options : RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    }

    return fetch(`${API_URL}${CUSTOMERS_ENDPOINT}`, options);
}