import { API_URL } from "../constants/api";
import { CreateExpenseFormData } from "../types/expenses.types";

const EXPENSES_ENDPOINT = 'expenses'

export const getExpenses = () => {
    return fetch(`${API_URL}${EXPENSES_ENDPOINT}`)
       .then(response => response.json())
       .then(data => data.data)
       .catch(error => console.error('Error:', error));
}

export const createExpense = (data: CreateExpenseFormData) => {
    const newBody = JSON.stringify({
        name: data.name,
        type: data.type,
        amount: Number(data.amount),
        status: 'PAGADO'
    })
    
    const options : RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: newBody,
    }

    return fetch(`${API_URL}${EXPENSES_ENDPOINT}`, options);
}