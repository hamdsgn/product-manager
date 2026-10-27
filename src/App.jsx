import { Routes, Route, Navigate } from 'react-router-dom';
import FavoritesPage from './pages/FavoritesPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
      <Route path="/categorias" element={<CategoryPage/>}/>
      <Route path="/categorias/:categeory" element={<CategoryPage/>}/>
	    <Route path='/producto/:id' element={<ProductPage/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
