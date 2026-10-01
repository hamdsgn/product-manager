import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';


function FavoriteCount() {
    const {favorites} = useContext(FavoritesContext);

  return (
    <p>{favorites.length} favoritos</p>
  )
}

export default FavoriteCount