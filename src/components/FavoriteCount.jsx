import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';


function FavoriteCount() {
    const {favorites} = useContext(FavoritesContext);

  return (
    <h2>Favoritos: {favorites.length}</h2>
  )
}

export default FavoriteCount