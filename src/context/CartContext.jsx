import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem('cart')) || []
	});

    useEffect(()=>{
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

    const handleAddToCart = (product) => {
        setCart(current => {
            const exist = current.some(item => item.id === product.id);

            if (exist) {
            return current.map(item =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            }

            return [...current, { ...product, quantity: 1 }];
        });
    };

	const handleDecreaseQuantity = (product) => {
		if(product.quantity > 1){
			const decrease =  cart.map(item => {
				if(item.id === product.id) {
					return {...item, quantity: item.quantity -1}
				}
				return item
			})
			setCart(decrease)
		}else{
			setCart(current => current.filter(item =>  item.id !== product.id))

		}
	}

	const handleRemoveProduct = (product) => {
		setCart (current => current.filter(item => item.id !== product.id))
	}

	const totalCart = cart.reduce((acumulador, item)=> {
		return acumulador + (item.price * item.quantity);
	}, 0);

    return(
        <CartContext.Provider value={{cart, handleAddToCart, handleDecreaseQuantity, handleRemoveProduct, totalCart}}>
            {children}
        </CartContext.Provider>
    )

}