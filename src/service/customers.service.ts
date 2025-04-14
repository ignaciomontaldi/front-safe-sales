import { API_URL } from "../constants/api";
import { CreateClientFormData, EditClientFormData } from "../types/forms.types";

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

export const updateCustomerById = async (data: EditClientFormData) => {
    const body = JSON.stringify({
        fullname: data.fullname,
        frequency: data.frequency,
        phone: data.phone,
    });
    const options : RequestInit = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    }

    return fetch(`${API_URL}${CUSTOMERS_ENDPOINT}/${data.id}`, options);
}

export const deleteCostumerById = async (id: string) => {
    const options : RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    return fetch(`${API_URL}${CUSTOMERS_ENDPOINT}/${id}`, options);
}