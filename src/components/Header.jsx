import { useState } from 'react';
import FavoriteList from './FavoriteList.jsx';
import FavoriteCount from './FavoriteCount.jsx';

export function Header() {
    const [showFavorites, setShowFavorites] = useState(false);

    function handleShowFavorites() {
        setShowFavorites(current => !current);
    }   

    return (
        <>
            <FavoriteCount />
            
            <button onClick={handleShowFavorites}>
                {showFavorites ? "Ocultar favoritos" : "Mostrar Favoritos"}
            </button>

            {showFavorites && (
                <FavoriteList />
            )}
        </>
    )
}
