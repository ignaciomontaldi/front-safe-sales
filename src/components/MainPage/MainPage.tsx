import Sales from '../Sales/Sales'
import "./mainPage.css"
import Timer from '../Timer/Timer'
import { FilterProvider } from '../../context/filterContext'
import { Sale } from '../../types/sale.types'
import { useState } from 'react'
import { useSearch } from '../../hooks/useSearch'
import { useLoading } from '../../hooks/useLoading'
function MainPage() {

    const sales : Sale[] = [
        {
          date: "11/10/2024",
          products: "1 kilo de milanesas, 3 kilos de pechuga",
          total: 15689.00,
          payment: "Efectivo",
        },
        {
          date: "11/10/2024",
          products: "1 kilo de milanesas",
          total: 12564.00,
          payment: "Débito",
        },
        {
          date: "10/10/2024",
          products: "2 kilos de patamuslo",
          total: 5254.00,
          payment: "Crédito",
        },
        {
          date: "10/10/2024",
          products: "3 kilos de pechuga",
          total: 8569.00,
          payment: "Transferencia",
        },
        {
          date: "09/10/2024",
          products: "3 kilo de milanesas",
          total: 3000.00,
          payment: "Efectivo",
        },
        {
          date: "09/10/2024",
          products: "1 kilo de milanesas, 3 kilos de pechuga",
          total: 15689.00,
          payment: "Efectivo",
        },
        {
          date: "09/10/2024",
          products: "1 kilo de milanesas",
          total: 12564.00,
          payment: "Débito",
        },
        {
          date: "08/10/2024",
          products: "2 kilos de patamuslo",
          total: 5254.00,
          payment: "Crédito",
        },
        {
          date: "08/10/2024",
          products: "3 kilos de pechuga",
          total: 8569.00,
          payment: "Transferencia",
        },
        {
          date: "07/10/2024",
          products: "3 kilo de milanesas",
          total: 3000.00,
          payment: "Efectivo",
        },
      ]

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [copySales, setCopySales] = useState<Sale[]>(sales)
    const {inputValue, setInputValue} = useSearch();
    const {setLoad} = useLoading();
    const itemsPerPage = 5;
    const totalPages = Math.ceil(sales.length / itemsPerPage);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentSales = copySales.slice(firstIndex, lastIndex);

      const handlePageChange = (pageNumber:number) => {
        setLoad(true);
        setCurrentPage(pageNumber);
        setLoad(false);
      }

      const handleSearch = () => {
        setLoad(true);
        setCopySales(sales.filter(sale => {
          return sale.products.toLowerCase().includes(inputValue.toLowerCase())
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
