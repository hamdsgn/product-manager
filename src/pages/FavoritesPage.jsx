
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import ProductList from '../components/ProductList.jsx';

function FavoritesPage() {
  const { favorites, handleClearFavorites } = useContext(FavoritesContext);

  return (
    <>
      <header className='section'>
        <h1>Mis favoritos</h1>
        <Link to="/">Volver a la tienda</Link>
      </header>
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
