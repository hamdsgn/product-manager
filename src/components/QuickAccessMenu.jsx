import { useContext, useState, useRef, useCallback } from 'react';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { RecentlyViewedContext } from '../context/RecentlyViewedContext.jsx';
import FavoriteList from './FavoriteList.jsx';
import Cart from './Cart';
import {ShoppingCart, Heart, Scale, History, X} from 'lucide-react';
import { CompareContext } from '../context/CompareContext.jsx';
import ComparePanel from './ComparePanel.jsx';
import { useClickOutside } from '../hooks/useClickOutside.js';

function QuickAccessMenu() {
    const [activePopover, setActivePopover] = useState(null);
    const {cart, cartCount} = useContext(CartContext);
    const {favorites} = useContext(FavoritesContext);
    const {recentlyViewed} = useContext(RecentlyViewedContext);
    const {productsCompare} = useContext(CompareContext);
    const menuRef = useRef(null);

    const handleClosePopover = useCallback(() => {
            setActivePopover(null);
    }, []);
    
    useClickOutside(menuRef, handleClosePopover);

  return (
    <div className="quickAccess" ref={menuRef}>

        <div className='popovers'>
            <button 
                className="iconButton"
                aria-label = {`Favoritos, ${favorites.length}`}
                aria-expanded={activePopover === "favorite"}
                onClick={() => setActivePopover(current => current === "favorite" ? null : "favorite")}
            >
                <Heart size={18} strokeWidth={1.8} />
                {favorites.length > 0 && (
                    <span className="iconButton__badge">
                        {favorites.length}
                    </span>
                )}
            </button>
            <button 
                className="iconButton"
                aria-label={`Últimos visitados: ${recentlyViewed.length}`}
                aria-expanded={activePopover === "history"}
                onClick={() => setActivePopover(current => current === "history" ? null : "history")}
            >
                <History size={18} strokeWidth={1.8} />
                {recentlyViewed.length > 0 && (
                    <span className='iconButton__badge'>
                        {recentlyViewed.length}
                    </span>
                )}
            </button>
            <button 
                className="iconButton"
                aria-label={`Comparador, ${productsCompare.length} de 3 productos`}
                aria-expanded={activePopover === "compare"}
                onClick={() => setActivePopover(current => current === "compare" ? null : "compare" )}
            >
                <Scale size={18} strokeWidth={1.8} />
                {productsCompare.length > 0 && (
                    <span className='iconButton__badge'>
                        {productsCompare.length} / 3
                    </span>
                )}
            </button>
            <button 
                className="iconButton" 
                aria-label={`Carrito, ${cartCount} productos`}
                aria-expanded={activePopover === "cart"}
                onClick={() => setActivePopover(current => current === "cart" ? null : "cart")}
            >
                <ShoppingCart size={18} strokeWidth={1.8} />
                {cartCount > 0 && (
                    <span className='iconButton__badge'>
                        {cartCount}
                    </span>
                )}
            </button>

        </div>
        
        {activePopover === 'favorite' && (
                <div className="popoverPanel">
                    <button 
                        type="button"
                        onClick={handleClosePopover}
                        aria-label="Cerrar panel"
                        className='btn btn--secondary'
                    >
                        <X size={18} strokeWidth={1.8}/>
                    </button>
                    <FavoriteList/>
                </div>
        )}
        {activePopover === "history" && (
            <div className="popoverPanel">
                <button 
                    type="button"
                    onClick={handleClosePopover}
                    aria-label="Cerrar panel"
                    className='btn btn--secondary'
                >
                    <X size={18} strokeWidth={1.8}/>
                </button>
                { recentlyViewed.length === 0 
                    ?   <p>No has visitado ningún producto</p>
                    :   <ul>
                            {recentlyViewed.map(item => (
                                <li key={item.id}> 
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                }
            </div>
        )}
        {activePopover === "compare" && (
            <div className="popoverPanel">
                <button 
                    type="button"
                    onClick={handleClosePopover}
                    aria-label="Cerrar panel"
                    className='btn btn--secondary'
                >
                    <X size={18} strokeWidth={1.8}/>
                </button>
                {productsCompare.length === 0 ? (
                    <p>No has elegido productos para comparar</p>
                ):(
                    <ComparePanel/>
                )}
            </div>
        )}
        {activePopover === 'cart' && (
            <div className="popoverPanel">
                <button 
                    type="button"
                    onClick={handleClosePopover}
                    aria-label="Cerrar panel"
                    className='btn btn--secondary'
                >
                    <X size={18} strokeWidth={1.8}/>
                </button>
                { cart.length > 0 
                    ? <Cart/>
                    : <p>Carrito Vacío</p>
                }
            </div>
        )}
    </div>
  )
}

export default QuickAccessMenu