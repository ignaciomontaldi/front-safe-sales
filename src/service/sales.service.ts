import { API_URL } from '../constants/api';
import { Sale } from "../types/sale.types";
import CreateSaleForm from '../components/CreateSaleForm/CreateSaleForm';
import { CreateSaleFormData } from '../types/forms.types';

export const SALES_ENDPOINT = 'sales'

export const getSales = async () : Promise<T> => {
    try {
        const response = await fetch(`${API_URL}${SALES_ENDPOINT}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            return data.data as Sale[];
        }
        
    } catch (error) {
        throw new Error('HTTP error: ' + error);
    }
}

export const getSaleByID = async (id: string): Promise<Sale> => {
    try {
        const response = await fetch(`${API_URL}${SALES_ENDPOINT}/${id}`,{
            method: 'GET'
        })
        if(response.ok) {
            const data = await response.json();
            return data as Sale;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        throw new Error('Error: ' + error)
    }
}

export const createSale = async (data:CreateSaleFormData) => {
    const body = JSON.stringify({
        status: 'PENDIENTE',
        payment: data.payment.toUpperCase(),
        customer: data.customer,
        items: data.productList
    })
    try {
        const response = await fetch(`${API_URL}${SALES_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            return 0; // Venta creada con éxito
        }
    } catch (error) {
        throw new Error('Could not reach server')
    }
}