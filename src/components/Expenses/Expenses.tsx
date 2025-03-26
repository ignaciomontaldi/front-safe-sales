import { useEffect, useState } from 'react'
import { getExpenses } from '../../service/expenses.service'
import type { Expenses } from '../../types/expenses.types'
import ExpensesList from '../ExpensesList/ExpensesList'
import './expenses.css'
import CreateExpenseForm from '../CreateExpenseForm/CreateExpenseForm'

const Expenses = () => {

    const [expenses, setExpenses] = useState<Expenses[]>([])
    const [expenseView, setExpenseView] = useState<number>(0);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await getExpenses();
                setExpenses(response)
            } catch (error) {
                console.error('Error fetching expenses:', error)
            }
        }
        fetchExpenses()
    }, [])

  return (
    <section id="expenses-view">
        {expenseView === 0 && <>
            <div id="expenses-title">
            <h1>Expensas</h1>
            <div id="expenses-btn-container">
                <button type='button' id="create-expense-btn" onClick={() => setExpenseView(1)}>Crear un gasto</button>
                <button type='button' id='update-expense-btn'>Modificar Gasto</button>
            </div>
        </div>
        {expenses.length > 0 ?
            <ExpensesList expenses={expenses}/> :
        <p className='mt-20 text-center text-lg text-softBlack font-bold'>No se han cargado expensas</p>}
        </>}
        {expenseView === 1 && <CreateExpenseForm setExpenseView={setExpenseView}/>}
    </section>
  )
}

export default Expenses