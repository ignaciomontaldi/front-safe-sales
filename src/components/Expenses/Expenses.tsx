import { useEffect, useState } from 'react'
import { getExpenses } from '../../service/expenses.service'
import type { Expenses } from '../../types/expenses.types'
import ExpensesList from '../ExpensesList/ExpensesList'
import './expenses.css'

const Expenses = () => {

    const [expenses, setExpenses] = useState<Expenses[]>([])

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
        <div id="expenses-title">
            <h1>Expensas</h1>
            <div id="expenses-btn-container">
                <button type='button' id="create-expense-btn">Crear un gasto</button>
                <button type='button' id='update-expense-btn'>Modificar Gasto</button>
            </div>
        </div>
        {expenses && expenses.length === 0 ?
            <ExpensesList expenses={expenses}/> :
        <p className=' mt-20 text-center text-lg text-softBlack font-bold'>No se han cargado expensas</p>}
    </section>
  )
}

export default Expenses