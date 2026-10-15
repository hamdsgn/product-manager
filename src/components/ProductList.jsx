import ProductCard from './ProductCard.jsx'
import './styleComponents.css';

const ProductList = ({products, onTest}) => {
  return (
    <ul className='productList'>
        {
            products.map(product => (
                <ProductCard
                    key={product.id} 
                    product={product}
                    onTest={onTest}
                />
            ))
        }
    </ul>
  )
}

export default ProductList; 
