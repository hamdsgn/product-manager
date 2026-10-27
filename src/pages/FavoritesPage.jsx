
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import ProductList from '../components/ProductList.jsx';
import Header from '../components/Header.jsx';

function FavoritesPage() {
  const { favorites, handleClearFavorites } = useContext(FavoritesContext);

  return (
    <>
      <Header/>
      <main className='section'>


        {favorites.length === 0 ? (
          <p>No tienes productos favoritos.</p>
        ) : (
          <>
            <p>{favorites.length} productos favoritos</p>
            <button
              className="btn btn--secondary"
              onClick={handleClearFavorites}
            >
              Limpiar favoritos
            </button>

            <ProductList products={favorites} />
          </>
        )}
      </main>
    </>
  );
}

export default FavoritesPage;
