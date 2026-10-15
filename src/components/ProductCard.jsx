import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import { memo } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import {ShoppingCart, HeartPlus, HeartMinus, Scale} from 'lucide-react';
import { RecentlyViewedContext } from '../context/RecentlyViewedContext.jsx';

const ProductCard = memo(({product, setrecentlyViewed, handleProductsCompare, productsCompare}) => {
    const {handleAddToCart} = useContext(CartContext);
    const {isFavorite, toggleFavorite} = useContext(FavoritesContext);
    const {handlerecentlyViewed} = useContext(RecentlyViewedContext)
    const exist = productsCompare.some(item => item.id === product.id)
    return (
      <>
			<div className='item'>
                <div className="item__left">
                    <img width={150} height={150} src={product.image}/>
                </div>
                <div className="item__right">
                    <div>
                        <button className="btn btn--secondary" onClick={() => toggleFavorite(product)}>
                            {isFavorite(product) 
                                ? <HeartMinus  size={18} strokeWidth={1.8} />
                                : <HeartPlus  size={18} strokeWidth={1.8} />
                            }
                        </button>
                        <button className="btn btn--secondary" 
                            onClick={() => handleProductsCompare(product) }
                            disabled={productsCompare.length === 3 && !exist}
                        >
                            {
                                exist 
                                ? "Quitar" 
                                : <Scale size={18} strokeWidth={1.8} />
                            }
                        </button>
                    </div>
                    
                    <h3>{product.title}</h3>
                    <p>{product.category}</p>
                    <p><b>{product.price} €</b></p>
                    
                    <div className='cart-buttons'>
                        <button className="btn btn--secondary" onClick={() => handlerecentlyViewed(product)}>
                            Ver
                        </button>

                        <button className="btn btn--accent" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart size={18} strokeWidth={1.8} />
                            Comprar
                        </button>
                    </div>


                </div>
                {/* {console.log("ProductCard render:", product.title)} */}
                {console.log("Render:", product.title)}
			</div>
		</>
    )
})

export default ProductCard
