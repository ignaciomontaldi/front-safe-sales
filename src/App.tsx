import './App.css'
import CreateSaleForm from './components/CreateSaleForm/CreateSaleForm'
import Inventory from './components/Inventory/Inventory';
import MainPage from './components/MainPage/MainPage'
import { useTab } from './hooks/useTab'

function App() {
  const {tab} = useTab();
  return (
    <main>
      {tab === 0 && <MainPage />}
      {tab === 1 && <CreateSaleForm />}
      {tab === 2 && <Inventory/>}
    </main>
  )
}

export default App
