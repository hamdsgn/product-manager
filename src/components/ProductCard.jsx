import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import { memo } from 'react';

const ProductCard = memo(({product, setrecentlyViewed, handleProductsCompare, productsCompare, handleAddToCart}) => {
    const {isFavorite, toggleFavorite} = useContext(FavoritesContext);
    const exist = productsCompare.some(item => item.id === product.id)
    return (
      <>
			<div className='item'>
                <div className="item__left">
                    <img width={150} height={150} src={product.image}/>
                </div>
                <div className="item__right">
                    <h3>{product.title}</h3>
                    <p>{product.category}</p>
                    <p><b>{product.price} €</b></p>
                    
                    <button className="btn btn--secondary" onClick={() => toggleFavorite(product)}>
                        {isFavorite(product) 
                            ? "💔 Quitar de favoritos" 
                            : "❤️ Añadir a favoritos"
                        }
                    </button>

                    <button className="btn btn--secondary" onClick={() => setrecentlyViewed(product)}>
                        Ver producto
                    </button>

                    <button className="btn btn--primary" 
                        onClick={() => handleProductsCompare(product) }
                        disabled={productsCompare.length === 3 && !exist}
                    >
                        {
                            exist ? "Quitar" : "Comparar"
                        }
                    </button>

                    <button className="btn btn--accent" onClick={() => handleAddToCart(product)}>
                        Agregar al carrito
                    </button>

                </div>
                {/* {console.log("ProductCard render:", product.title)} */}
                {console.log("Render:", product.title)}
			</div>
		</>
    )
})

export default ProductCard
