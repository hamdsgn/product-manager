import { useState, useEffect, useMemo, useCallback, useContext, useRef } from 'react'
import ProductList from './components/ProductList.jsx'
import ProductSearch from './components/ProductSearch.jsx';
import QuickAccessMenu from './components/QuickAccessMenu.jsx';
import { CompareContext } from './context/CompareContext.jsx';
import { useClickOutside } from './hooks/useClickOutside.js';
import { Info, X } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || "");
  const [searchCat, setSearchCat] = useState(localStorage.getItem('searchCat') || "todas");
  const [searchOrder, setSearchOrder] = useState(localStorage.getItem('searchOrder') || "1")
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const {showMessageCompare, setShowMessageCompare} = useContext(CompareContext);
  const messageRef = useRef(null);

	const getProducts = useCallback(async ()=>{
		setLoading(true);
		setError(null);
		
		try {
			// const response = await fetch("/json/LocalProducts.json");
			const response = await fetch("https://fakestoreapi.com/products");
			if (!response.ok) {
				throw new Error("No se pudo conectar con el servidor");
			}
			const datos = await response.json();
			setProducts(Array.isArray(datos) ? datos : datos.products ?? []);
			// setProducts(datos)
		}catch(e){
			setError(e.message);
  			console.error(e);
		}finally {
			setLoading(false);
		}
	}, [])

	useEffect(()=>{
		getProducts();
	}, [getProducts]);

	useEffect(()=>{
		setPage(1)
	}, [searchTerm, searchCat, searchOrder])

	useEffect(()=>{
		localStorage.setItem('searchCat', searchCat)
		localStorage.setItem('searchTerm', searchTerm)
		localStorage.setItem('searchOrder', searchOrder)
	},[searchCat, searchTerm, searchOrder])

	const filteredProducts = useMemo(() => {
		const result =  products.filter(product => 
							(searchTerm === "" ||
								product.title.toLowerCase().includes(searchTerm.toLowerCase())
							)
							&&
							(searchCat === "todas" ||
								product.category === searchCat
							)
						);
		return [...result].sort((a,b) => {
			switch (searchOrder) {
				case "1" : // precio menor a mayor
					return a.price - b.price;
				case "2" : // precio de mayor a menor
					return b.price - a.price;
				case "3" : // Nombre A-Z
					return a.title.localeCompare(b.title)
				case "4" : // Nombre Z-A
					return b.title.localeCompare(a.title)
				default :
					return 0; // Sin orden por defecto
			}
		})
	}, [products, searchTerm, searchCat, searchOrder])

	const productsPage = 4;
	const totalProducts = filteredProducts.length;
	const startIndex = (page-1) * productsPage;
	const endIndex = startIndex + productsPage
	const currentProduct = filteredProducts.slice(startIndex, endIndex)
	const totalPages = Math.ceil(totalProducts / productsPage);

	
	const handleCloseMessage = useCallback(() => {
		setShowMessageCompare(false);
	}, [setShowMessageCompare]);
	
	useClickOutside(messageRef, handleCloseMessage, showMessageCompare);
	
	
	if (loading) {
		return <p className="loading-message">Cargando productos...</p>
	}

	if (error) {
		return (
			<>
				<p className="error-message">
					❌ {error}
				</p>
				<button className="btn btn--secondary" onClick={getProducts}>Reintentar</button>
			</>
		)
	}
	
	return (
		<>
			<header className='header'>
				<h1>Mi Tienda</h1>
				<QuickAccessMenu/>
			</header>

			{showMessageCompare && (
				<div 
					className='message-compare' 
					ref={messageRef}
				>
					<Info size={18} strokeWidth={1.8} /> 
					<span>Has alcanzado el limite de productos</span>
					<button 
						type="button"
					    aria-label="Cerrar aviso"
						onClick={handleCloseMessage}
					>
						<X  size={20} strokeWidth={1.8}/>
					</button>
				</div>
			)}

			<section>
				<main>
					<div className="main-content">

						<div className="main-content__search">
							<h2>Buscar productos</h2>
							<div className="main-content__searchBox">
								<ProductSearch
									products={products}
									searchCat={searchCat}
									searchTerm={searchTerm}
									setSearchTerm={setSearchTerm} 
									setSearchCat={setSearchCat}
									searchOrder={searchOrder}
									setSearchOrder={setSearchOrder}
								/>
							</div>
							
						</div>

						<div className='main-content__products'>
							{totalProducts > 0 
									? <h2>{totalProducts} productos encontrados</h2> 
									: <h2>No se han encontrado productos</h2>
							}
							{
								(filteredProducts.length === 0 )
								? 	"⚠️ No se encontraron productos que coincidan con la búsqueda." 
								: 	<ProductList 
										products={currentProduct}
									/>
							}
						</div>
					</div>
				</main>

				{filteredProducts.length > 0 && (
						<div className="pagination">
							<button className="btn btn--secondary" 
								onClick={() => setPage(page - 1)} 
								disabled={page===1}
							>
								Prev
							</button>
							<p>página <span>{page}</span> de {totalPages}</p>
							<button className="btn btn--secondary" 
								onClick={()=> setPage(page + 1)}
								disabled={page === totalPages}
							>
								Next
							</button>
						</div>
				)}
			</section>

			
			
		</>
	);
}

export default App
