import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import { Trash } from 'lucide-react';

function FavoriteList() {
    const {favorites, toggleFavorite, handleClearFavorites} = useContext(FavoritesContext);

    return (
        <div>
            {favorites.length === 0 ? (
                <p>No tienes favoritos</p>
            ) : (
                <>
                    <ul>
                        {favorites.map(favorite => (
                            <li key={favorite.id}>
                                {favorite.title}
                                <button className="btn btn--secondary" onClick={() => toggleFavorite(favorite)}>
                                <Trash size={18} strokeWidth={1.8} />
                                </button>
                            </li>
                            
                        ))}
                    </ul>
                    { favorites.length > 0 && (
                        <button className="btn btn--secondary" onClick={handleClearFavorites}>
                            Limpiar Favoritos
                        </button>
                    )}
                </>
            )
            }
        </div>
    )
}

export default FavoriteList