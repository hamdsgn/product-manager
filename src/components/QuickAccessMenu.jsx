import { useContext, useState, useRef, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { RecentlyViewedContext } from '../context/RecentlyViewedContext.jsx';
import FavoriteList from './FavoriteList.jsx';
import Cart from './Cart';
import {ShoppingCart, Heart, Scale, History} from 'lucide-react';

function QuickAccessMenu() {
    const [activePopover, setActivePopover] = useState(null);
    const {cart} = useContext(CartContext);
    const {favorites} = useContext(FavoritesContext);
    const {recentlyViewed} = useContext(RecentlyViewedContext);
    const menuRef = useRef(null)
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
    useEffect(()=>{
        const handleClickOutside = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setActivePopover(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, []);
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
                onClick={(() => setActivePopover(current => current === "history" ? null : "history"))}
            >
                <History size={18} strokeWidth={1.8} />
                {recentlyViewed.length > 0 && (
                    <span className='iconButton__badge'>
                        {recentlyViewed.length}
                    </span>
                )}
            </button>
            <button className="iconButton">
                <Scale size={18} strokeWidth={1.8} />
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
        {activePopover === 'cart' && (
                <div className="popoverPanel">
                    { cart.length > 0 
                        ? <Cart/>
                        : <p>Carrito Vacío</p>
                    }
                </div>
        )}
        {activePopover === 'favorite' && (
                <div className="popoverPanel">
                    <FavoriteList/>
                </div>
        )}
        {activePopover === "history" && (
            <div className="popoverPanel">
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
    </div>
  )
}

export default QuickAccessMenu