import { useTab } from "../../hooks/useTab"
import "./header.css"
function Header() {
  const {tab, setTab} = useTab();
  
  const toHomePage = () => {
    if(tab !== 0){
      setTab(0);
    }
  }

  const toCreateSaleForm = () => {
    if(tab!== 1){
      setTab(1);
    }
  }
  return (
    <header>
        <nav>
            <div id="home-tab" onClick={toHomePage}>
                <p className={tab === 0 ? "font-bold underline" : undefined}>Página Principal</p>
            </div>
            <div id="create-sale-tab" onClick={toCreateSaleForm}>
                <p  className={tab === 1 ? "font-bold underline" : undefined}>Crear Venta</p>
            </div>
        </nav>
    </header>
  )
}

export default Header