import { Expenses } from '../../types/expenses.types';
type ExpensesListParams = {
    expenses: Expenses[];
}

const ExpensesList = ({expenses} : ExpensesListParams) => {
  return (
    <table id="expenses-table">
            <thead id="expenses-head">
                <tr id="expenses-tr">
                    <th id="expenses-th">Nombre</th>
                    <th id="expenses-th">Tipo</th>
                    <th id="expenses-th">Estado</th>
                    <th id="expenses-th">Monto</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td id="expenses-td">{expense.name}</td>
                        <td id="expenses-td">{expense.type}</td>
                        <td id="expenses-td">{expense.status}</td>
                        <td id="expenses-td">{expense.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
  )
}

export default ExpensesList