
function ComparePanel( {productsCompare, handleRemoveProductCompare} ) {
  return (
    <div>
        <h2>Comparador de productos: {productsCompare.length}/3</h2>
        <ul className="products-compare">
            {
                productsCompare.map(item => (
                    <li key={item.id}>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                        <button className="btn btn--secondary" onClick={() => handleRemoveProductCompare(item)}>
                            Quitar
                        </button>
                    </li>
                    
                ))
            }
        </ul>
    </div>
  )
}

export default ComparePanel