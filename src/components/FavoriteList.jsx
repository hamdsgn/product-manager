import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

function FavoriteList() {
    const {favorites, toggleFavorite} = useContext(FavoritesContext);

    return (
        <ul>
            {favorites.map(favorite => (
                <li key={favorite.id}>
                    {favorite.title}
                    <button onClick={() => toggleFavorite(favorite)}>Quitar</button>
                </li>
                
            ))}
        </ul>
    )
}

export default FavoriteList