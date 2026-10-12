import { useState, useEffect, useMemo, useCallback, use } from 'react'
import ProductList from './components/ProductList.jsx'
import { Favorites } from './components/Favorites.jsx';
import ProductSearch from './components/ProductSearch.jsx';
import ComparePanel from './components/ComparePanel.jsx';
import Cart from './components/Cart.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || "");
  const [searchCat, setSearchCat] = useState(localStorage.getItem('searchCat') || "todas");
  const [searchOrder, setSearchOrder] = useState(localStorage.getItem('searchOrder') || "1")
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(1);
  const [recentlyViewed, setrecentlyViewed] = useState([]);
  const [productsCompare, setProductsCompare] = useState([]);
  const [showMessageCompare, setShowMessageCompare] = useState(false);
  	const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem('cart')) || []
	});


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

	useEffect(()=>{
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

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

	const handlerecentlyViewed = (product) => {
		setrecentlyViewed(current => {
			const filtered = current.filter(
				item => item.id !== product.id
			)

			const updated = [product, ...filtered]

			return updated.slice(0,3)
		});
	}

	const handleProductsCompare = (product) => {
		setProductsCompare(current =>{

			const exist = current.some(item => item.id === product.id)

			if (exist === true){
				const addCompare =  current.filter(
					item => item.id !== product.id
				)
				
				console.log("Quitado")
				return addCompare
			} else {
				if(current.length < 3){

					const update = [...current, product]

					if(update.length === 3){
						console.log("Has alcanzado el máximo")
						setShowMessageCompare(true)
						setTimeout(() => {
							setShowMessageCompare(false)
						}, 3000)
					}
					return update
				}
				return current
			}
		})
	}

	const handleRemoveProductCompare = (product) => {
		setProductsCompare(current=> {
			return current.filter(item => item.id !== product.id)
		})
	}

	const handleAddToCart = (product) => {
		const exist = cart.some(item => item.id === product.id)

		if(exist){
			const updateCart = cart.map(item => {
				if(item.id === product.id){
					return{
						...item,
						quantity: item.quantity + 1
					};
				}
				return item;
			});
			setCart(updateCart);
		}else{
			setCart(current=> [...current, {...product, quantity:1}])
		}
	}

	const handleDecreaseQuantity = (product) => {
		if(product.quantity > 1){
			const decrease =  cart.map(item => {
				if(item.id === product.id) {
					return {...item, quantity: item.quantity -1}
				}
				return item
			})
			setCart(decrease)
		}else{
			setCart(current => current.filter(item =>  item.id !== product.id))

		}
	}

	const handleRemoveProduct = (product) => {
		setCart (current => current.filter(item => item.id !== product.id))
	}

	const totalCart = cart.reduce((acumulador, item)=> {
		return acumulador + (item.price * item.quantity);
	}, 0);
	
	
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
			<header>
				<Favorites/>

				<hr />

				<h2>Ultimos visitados: {recentlyViewed.length}</h2>
				<ul>
					{
						recentlyViewed.map(product=> (
								<li key={product.id}>
									{product.title}
								</li>
							))
					}
				</ul>

				<hr />

				<ComparePanel
					productsCompare = {productsCompare}
					handleRemoveProductCompare = {handleRemoveProductCompare}
				/>

				<hr />
				{cart.length > 0 ? (
					<Cart
						handleAddToCart = {handleAddToCart}
						handleDecreaseQuantity = {handleDecreaseQuantity}
						handleRemoveProduct = {handleRemoveProduct}
						totalCart = {totalCart}
						cart = {cart}
					/>
				) : (
					<h2>Mi carrito: Vacío</h2>
				)}
			</header>

			{showMessageCompare && (
				<p className='message-compare'>Has alcanzado el limite de productos para comparar</p>
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
										onTest={handleTester}
										setrecentlyViewed={handlerecentlyViewed}
										handleProductsCompare = {handleProductsCompare}
										productsCompare={productsCompare}
										handleAddToCart = {handleAddToCart}
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
