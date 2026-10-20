import ProductCard from './ProductCard.jsx'
import './styleComponents.css';

const ProductList = ({products}) => {
  return (
    <ul className='productList'>
        {
            products.map(product => (
                <ProductCard
                    key={product.id} 
                    product={product}
                />
            ))
        }
    </ul>
  )
}

export default ProductList; 
