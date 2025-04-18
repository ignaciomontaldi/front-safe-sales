import { useEditField } from '../../hooks/useEditField';
import { Expenses } from '../../types/expenses.types';
type ExpensesListParams = {
    expenses: Expenses[];
    setEditExpense: (expense: Expenses | null) => void;
}

const ExpensesList = ({expenses, setEditExpense} : ExpensesListParams) => {

    const {change} = useEditField();

  return (
    <table id="expenses-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Monto</th>
                    {change && <th id="edit-field" className='text-sm'>Editar Expensa</th>}
                    {change && <th id="erase-field" className='text-sm'>Eliminar Expensa</th>}
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td>{expense.name}</td>
                        <td>{expense.type}</td>
                        <td>{expense.status}</td>
                        <td>{expense.amount}</td>
                        {change && <td id="edit-btn-field"><button type="button" className="font-semibold" onClick={() => setEditExpense(expense)}>Editar</button></td>}
                        {change && <td id="erase-btn-field"><button type="button" className="font-semibold">Eliminar</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>
  )
}

export default ExpensesList