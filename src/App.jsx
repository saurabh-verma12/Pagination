
import './App.css'
import { useEffect, useState } from 'react'

export default function App() {

  const [products,setproducts] = useState([])
  const [pages,setpages] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`)
    const data = await res.json()

    console.log(data);
    if(data && data.products){
      setproducts(data.products)
    }
  }
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== pages) {
      setpages(selectedPage)
    }
  }

   
  useEffect(() => {
    fetchProducts()
  }, [])
  
  return (
    <div>
      {products.length > 0 && <div className='product'>{products.slice(pages*10-10,pages*10).map((prod) => (
        <span key={prod.id} className='item'>
          <img src={prod.thumbnail} alt={prod.title} />
          <span className='text'>{prod.title}</span>
          </span>
          
        
))}
  </div>}



  <div className="pagination">
        <span onClick={() => selectPageHandler(pages - 1)} className={pages > 1 ? "" : "pagination__disable"}>Prev</span>

        {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className={pages === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
        })}

        <span onClick={() => selectPageHandler(pages + 1)} className={pages < products.length / 10 ? "" : "pagination__disable"}>Next</span>
      </div>
    </div>
    
      );
    }


