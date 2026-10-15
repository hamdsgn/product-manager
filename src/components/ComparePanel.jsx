import { useContext } from "react"
import { CompareContext } from "../context/CompareContext"

function ComparePanel() {
    const {productsCompare, handleRemoveProductCompare} = useContext(CompareContext)
  return (
    <ul className="products-compare">
        {
            productsCompare.map(item => (
                <li key={item.id}>
                    <img width={50} src={item.image} alt={item.title} />
                    <p>{item.title}</p>
                    <p>{item.price.toFixed(2)} €</p>
                    <button className="btn btn--secondary" onClick={() => handleRemoveProductCompare(item)}>
                        Quitar
                    </button>
                </li>
                
            ))
        }
    </ul>
  )
}

export default ComparePanel