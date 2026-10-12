import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

function FavoriteList() {
    const {favorites, toggleFavorite, handleClearFavorites} = useContext(FavoritesContext);

    return (
        <div>
            <ul>
                {favorites.map(favorite => (
                    <li key={favorite.id}>
                        {favorite.title}
                        <button className="btn btn--secondary" onClick={() => toggleFavorite(favorite)}>Quitar</button>
                    </li>
                    
                ))}
            </ul>
            { favorites.length > 0 && (
                <button className="btn btn--secondary" onClick={() => handleClearFavorites()}>
                    Limpiar Favoritos
                </button>
            )}
        </div>
    )
}

export default FavoriteList