import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import FavoriteList from './FavoriteList.jsx';
import { FavoritesContext } from '../context/FavoritesContext';
import {ShoppingCart, Heart, Scale, History} from 'lucide-react';
import Cart from './Cart';

function QuickAccessMenu() {
    const [activePopover, setActivePopover] = useState(null);
    const {cart} = useContext(CartContext);
    const {favorites} = useContext(FavoritesContext)
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
  return (
    <div className="quickAccess">

        <div className='popovers'>
            <button 
                className="iconButton"
                aria-label = {`Favoritos, ${favorites.length}`}
                onClick={() => setActivePopover(current => current === "favorite" ? null : "favorite")}
            >
                <Heart size={18} strokeWidth={1.8} />
                {favorites.length > 0 && (
                    <span className="iconButton__badge">
                        {favorites.length}
                    </span>
                )}
            </button>
            <button className="iconButton">
                <History size={18} strokeWidth={1.8} />
            </button>
            <button className="iconButton">
                <Scale size={18} strokeWidth={1.8} />
            </button>
            <button 
                className="iconButton" 
                aria-label={`Carrito, ${cartCount} productos`} 
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
        {
            activePopover === 'cart' && (
                <div className="popoverPanel">
                    { cart.length > 0 
                        ? <Cart/>
                        : <p>Carrito Vacío</p>
                    }
                </div>
            )
        }
        {
            activePopover === 'favorite' && (
                <div className="popoverPanel">
                    <FavoriteList/>
                </div>
            )}
    </div>
  )
}

export default QuickAccessMenu