import Sales from '../Sales/Sales'
import "./mainPage.css"
import Timer from '../Timer/Timer'
import { FilterProvider } from '../../context/filterContext'
import { Sale } from '../../types/sale.types'
import { useEffect, useState } from 'react'
import { useSearch } from '../../hooks/useSearch'
import { useLoading } from '../../hooks/useLoading'
import { getSales } from '../../service/sales.service'
import Loading from '../Loading/Loading'
function MainPage() {

    const [sales, setSales] = useState<Sale[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [copySales, setCopySales] = useState<Sale[]>(sales)
    const {inputValue, setInputValue} = useSearch();
    const {load, setLoad} = useLoading();
    const itemsPerPage = 5;
    const totalPages = Math.ceil(sales.length / itemsPerPage);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentSales = copySales.slice(firstIndex, lastIndex);

    useEffect(() => {
      const fetchSales = async () => {
          setLoad(true);
          try {
            const result = await getSales();
            setSales(result)
            setCopySales(result)
            setLoad(false);
          } catch (error) {
            throw new Error('Error fetching sales')
            setLoad(false);
          }
        }
      fetchSales();
    },[]);


      const handlePageChange = (pageNumber:number) => {
        setLoad(true);
        setCurrentPage(pageNumber);
        setLoad(false);
      }

      const handleSearch = () => {
        setLoad(true);
        setCopySales(sales.filter((sale,index) => {
          return sale.products[index].name.toLowerCase().includes(inputValue.toLowerCase())
        }))
        setLoad(false);
      }

      const resetSearch = () => {
        setLoad(true);
        setInputValue('')
        setCopySales(sales)
        setLoad(false);
      }

    return (
        <>
            <section id="home-view">
                <span id="title-container">
                    <h1 className='text-3xl font-semibold'>Safe Sales</h1>
                    <Timer />
                </span>
            </section>
            <section>
            <span id="search-bar">
            <div id="search-input-container">
                <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} className='bg-lightGray text-lg' placeholder="Buscar por producto" />
            </div>
            <span id="search-reset-btn-container">
            <button type="button" onClick={handleSearch} id="search-btn">Buscar</button>
            <button type="reset" id="reset-search" onClick={resetSearch}>Eliminar búsqueda</button>
            </span>
        </span>
                <Loading message='Cargando ventas...'/>
                <FilterProvider>
                <Sales sales={currentSales}/>
                </FilterProvider>
                <span id="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
          <p
            key={index + 1}
            className={currentPage === (index + 1) ? "bg-darkGray" : undefined}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </p>
        ))}
                </span>
            </section>
        </>
    )
}

export default MainPage
