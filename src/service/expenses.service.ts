import { API_URL } from "../constants/api";

const EXPENSES_ENDPOINT = 'expenses'

export const getExpenses = () => {
    return fetch(`${API_URL}${EXPENSES_ENDPOINT}`)
       .then(response => response.json())
       .then(data => data.data)
       .catch(error => console.error('Error:', error));
}