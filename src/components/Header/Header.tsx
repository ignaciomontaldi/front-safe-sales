import { useEditField } from "../../hooks/useEditField";
import { useTab } from "../../hooks/useTab"
import "./header.css"

type TabType = {
  id: number;
  name: string;
}

function Header() {
  const {tab, setTab} = useTab();
  const {setChange} = useEditField();
  
  const tabs:TabType[] = [
    {id: 0, name: "Inicio"},
    {id: 1, name: "Crear Venta"},
    {id: 2, name: "Inventario"},
    {id: 3, name: "Clientes"},
    {id: 4, name: "Expensas"},
    {id: 5, name: "Proveedores"},
  ]
  
  const handleChangeTab = (id: number) => {
    if(tab !== id){
        setChange(false);
        setTab(id);
    } 
  }

  return (
    <header>
        <nav>
            {tabs.map((t:TabType) => {
              return (
                <div key={t.id} className={tab!== t.id? "bg-inactiveLightBlue text-inactiveSoftBlack" : undefined} onClick={()=>handleChangeTab(t.id)}>
                  <p className={tab === t.id? "font-bold underline" : undefined}>{t.name}</p>
                </div>
              )
            })}
        </nav>
    </header>
  )
}

export default Header