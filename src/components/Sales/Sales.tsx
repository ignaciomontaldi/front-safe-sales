import { useFilter } from '../../hooks/useFilter';
import { Sale } from '../../types/sale.types'
import SalesTable from '../SalesTable/SalesTable'
import './sales.css'
import { filterSales } from '../../utils/filterSales';
import Loading from '../Loading/Loading';
import { useLoading } from '../../hooks/useLoading';
function Sales({sales} : {sales: Sale[]}) {
  const {filter, setFilter} = useFilter();
  const {load, setLoad} = useLoading();
  const changeFilter = (filter:string) => {
    setLoad(true);
    setFilter(filter);
    setLoad(false);
  }

  const filteredSales = filterSales(sales, filter)

  return (
    <article id="sales-container">
      <Loading message={"Cargando ventas..."} />
        <div id="filter-container" className={!load ? 'hidden' : 'flex'}>
            <h1 className='text-2xl font-bold text-softBlack'>Ventas</h1>
            <span>
                <h3 className='text-xl font-semibold text-softBlack'>Ordenar por</h3>
                <select id="filter" onChange={(e) => changeFilter(e.target.value)}>
                    <option value="price-desc">Precio (mayor a menor)</option>
                    <option value="price-asc">Precio (menor a mayor)</option>
                    <option value="date-desc">Fecha (mayor a menor)</option>
                    <option value="date-asc">Fecha (menor a mayor)</option>
                    <option value="transfers">Transferencía</option>
                    <option value="debit">Débito</option>
                    <option value="credit">Crédito</option>
                    <option value="cash">Efectivo</option>
                </select>
            </span>
        </div>
        <SalesTable salesList={filteredSales}/>
    </article>
  )
}

export default Sales