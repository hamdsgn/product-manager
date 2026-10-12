import { useState } from 'react';
import FavoriteList from './FavoriteList.jsx';
import FavoriteCount from './FavoriteCount.jsx';

export function Favorites() {
    const [showFavorites, setShowFavorites] = useState(false);

    function handleShowFavorites() {
        setShowFavorites(current => !current);
    }   

    return (
        <>
            <FavoriteCount />
            
            <button className="btn btn--secondary" onClick={handleShowFavorites}>
                {showFavorites ? "Ocultar favoritos" : "Mostrar Favoritos"}
            </button>

            {showFavorites && (
                <FavoriteList />
            )}
        </>
    )
}
