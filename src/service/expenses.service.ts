import { API_URL } from "../constants/api";
import { CreateExpenseFormData } from "../types/expenses.types";
import { EditExpenseFormData } from "../types/forms.types";

const EXPENSES_ENDPOINT = 'expenses'

export const getExpenses = () => {
    return fetch(`${API_URL}${EXPENSES_ENDPOINT}`)
       .then(response => response.json())
       .then(data => data.data)
       .catch(error => console.error('Error:', error));
}

export const createExpense = async (data: CreateExpenseFormData) => {
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

export const updateExpense = async (data: EditExpenseFormData) => {

    const body = JSON.stringify({
        name: data.name,
        type: data.type,
        amount: data.amount,
        status: 'PENDIENTE'
    })

    const options : RequestInit = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    }

    return fetch(`${API_URL}${EXPENSES_ENDPOINT}/${data.id}`, options);
}