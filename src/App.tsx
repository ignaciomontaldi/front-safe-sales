import './App.css'
import CreateSaleForm from './components/CreateSaleForm/CreateSaleForm'
import MainPage from './components/MainPage/MainPage'
import { useTab } from './hooks/useTab'

function App() {
  const {tab} = useTab();
  return (
    <main>
      {tab === 0 && <MainPage />}
      {tab === 1 && <CreateSaleForm />}
    </main>
  )
}

export default App
