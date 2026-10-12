import React from 'react'

function Cart({handleAddToCart, handleDecreaseQuantity, totalCart,handleRemoveProduct, cart}) {
  return (
    <div className='carrito'>
        <h2>Mi carrito</h2>
        <ul>
        {cart.map(item => (
            <li key={item.id} className='carrito__row'>
                <div>
                    <img className='carrito__img' width={80} src={item.image} alt={item.title} />
                </div>
                <div>
                    <p>{item.title}</p>
                    <p>{item.price.toFixed(2)}</p>
                    <div className='carrito__quantities'>
                        <button className="btn btn--secondary" onClick={() => handleDecreaseQuantity(item)}>
                            -
                        </button>
                        <span>{item.quantity}</span>
                        <button className="btn btn--secondary" onClick={()=> handleAddToCart(item)}>
                            +
                        </button>
                    </div>
                </div>
                <div>
                    <p>{(item.price * item.quantity).toFixed(2)} <span>€</span></p>
                    <p>Subtotal</p>
                    <button className="btn btn--secondary" onClick={() => handleRemoveProduct(item)}>🗑️</button>
                </div>
            </li>
        ))}
        </ul>
        <hr />
        <div className='carrito__total'>
            <p>Total del carrito</p>
            <p>{totalCart.toFixed(2)}</p>
        </div>
    </div>
  )
}

export default Cart