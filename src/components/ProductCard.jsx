import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import { memo } from 'react';

const ProductCard = memo(({product}) => {
    const {isFavorite, toggleFavorite} = useContext(FavoritesContext);
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
                    
                    <button onClick={() => toggleFavorite(product)}>
                        {isFavorite(product) 
                            ? "💔 Quitar de favoritos" 
                            : "❤️ Añadir a favoritos"
                        }
                    </button>

                    <button>
                        Ver producto
                    </button>

                </div>
                {/* {console.log("ProductCard render:", product.title)} */}
                {console.log("Render:", product.title)}
			</div>
		</>
    )
})

export default ProductCard
