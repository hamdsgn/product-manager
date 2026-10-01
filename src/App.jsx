import { useState, useEffect, useMemo, useCallback } from 'react'
import ProductList from './components/ProductList.jsx'
import { Header } from './components/Header.jsx';
import ProductSearch from './components/ProductSearch.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCat, setSearchCat] = useState("todas");
  const [searchOrder, setSearchOrder] = useState("1")
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(1);
  const [viewProduct, setViewProduct] = useState(0);

	const getProducts = useCallback(async ()=>{
		setLoading(true);
		setError(null);
		
		try {
			const response = await fetch("https://fakestoreapi.com/products");
			if (!response.ok) {
				throw new Error("No se pudo conectar con el servidor");
			}
			const datos = await response.json();
			setProducts(datos)
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

	const filteredProducts = useMemo(() => {
		console.log("🔥 Calculando filtros");
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
	

	const handleTester = useCallback(() => {
		setCounter(current => current + 1);
	}, []);
	
	
	if (loading) {
		return <p className="loading-message">Cargando productos...</p>
	}

	if (error) {
		return (
			<>
				<p className="error-message">
					❌ {error}
				</p>
				<button onClick={getProducts}>Reintentar</button>
			</>
		)
	}
	
	return (
		<>
			<header>
				<Header/>
			</header>


			<hr />
			<div className="searchContent">
				<ProductSearch 
					products={products}
					searchCat={searchCat}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm} 
					setSearchCat={setSearchCat}
					searchOrder={searchOrder}
					setSearchOrder={setSearchOrder}
				/>
				{totalProducts > 0 
						? <p>Se han encontrado {totalProducts} productos</p> 
						: <p>No se han encontrado productos</p>
				}
			</div>

			{/* <hr /> */}

			{/* <p>Contador : {counter}</p>
			<button onClick={handleTester}>
				probar render
			</button> */}

			<hr />

			<div className='productContent'>
				{
					(filteredProducts.length === 0 )
					? 	"⚠️ No se encontraron productos que coincidan con la búsqueda." 
					: 	<ProductList 
							products={currentProduct}
							onTest={handleTester}
							viewProduct={setViewProduct}
						/>
				}
			</div>
			{filteredProducts.length > 0 && (
					<div className="pagination">
						<button 
							onClick={() => setPage(page - 1)} 
							disabled={page===1}
						>
							Anterior
						</button>
						<p>página <span>{page}</span> de {totalPages}</p>
						<button 
							onClick={()=> setPage(page + 1)}
							disabled={page === totalPages}
						>
							Siguiente
						</button>
					</div>
				) }
			
			
		</>
	);
}

export default App
