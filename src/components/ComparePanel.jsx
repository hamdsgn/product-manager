import { useContext } from "react"
import { CompareContext } from "../context/CompareContext"

function ComparePanel() {
    const {productsCompare, handleRemoveProductCompare} = useContext(CompareContext)
  return (
    <div className="compareGrid">
        {productsCompare.map(item => (
                <article className="compareCard" key={item.id}>
                    <img width={50} src={item.image} alt={item.title} />
                    <p>{item.title}</p>
                    <p>{item.price.toFixed(2)} €</p>
                    <button 
                        className="btn btn--secondary" 
                        onClick={() => handleRemoveProductCompare(item)}
                    >
                        Quitar
                    </button>
                </article>
            ))}
    </div>
  )
}

export default ComparePanel