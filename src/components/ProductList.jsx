import ProductCard from './ProductCard.jsx'
import './styleComponents.css';

const ProductList = ({products, onTest, setrecentlyViewed, handleProductsCompare, productsCompare, handleAddToCart}) => {
  return (
    <ul className='productList'>
        {
            products.map(product => (
                <ProductCard
                    key={product.id} 
                    product={product}
                    onTest={onTest}
                    setrecentlyViewed = {setrecentlyViewed}
                    handleProductsCompare = {handleProductsCompare}
                    productsCompare = {productsCompare}
                    handleAddToCart = {handleAddToCart}
                />
            ))
        }
    </ul>
  )
}

export default ProductList; 
