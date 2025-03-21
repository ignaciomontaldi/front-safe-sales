import "./App.css";
import Clients from "./components/Clients/Clients";
import CreateSaleForm from "./components/CreateSaleForm/CreateSaleForm";
import Expenses from "./components/Expenses/Expenses";
import Inventory from "./components/Inventory/Inventory";
import MainPage from "./components/MainPage/MainPage";
import Suppliers from "./components/Suppliers/Suppliers";
import { useTab } from "./hooks/useTab";

function App() {
  const { tab } = useTab();
  return (
    <main>
      {tab === 0 && <MainPage />}
      {tab === 1 && <CreateSaleForm />}
      {tab === 2 && <Inventory />}
      {tab === 3 && <Clients />}
      {tab === 4 && <Expenses />}
      {tab === 5 && <Suppliers />}
    </main>
  );
}

export default App;
