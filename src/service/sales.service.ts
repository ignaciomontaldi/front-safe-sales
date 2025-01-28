import { API_URL } from '../constants/api';
import { Sale } from "../types/sale.types";

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
            console.log(data)
            return data as Sale;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        throw new Error('Error: ' + error)
    }
}