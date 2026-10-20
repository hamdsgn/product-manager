import { createContext, useState, useEffect, useMemo, useCallback } from "react";

export const CartContext = createContext();

function cartReducer(state, action) {
	switch(action.type){
		case "ADD":{
			const product = action.payload;

			const exist = state.some(
				item => item.id === product.id
			);

			if(exist) {
				return state.map(item => 
					item.id === product.id
					? {
						...item, quantity: item.quantity + 1
					} : item
				);
			}

			return [...state, {...product, quantity:1}]

		}

		case "DECREASE":
			return  state - 1;
		
		case "REMOVE":
			return !state;
		
		default:
			return state;
	}
}

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

		setCart(current => {
			const productInCart = current.find(item => item.id === product.id)

			if (!productInCart){
				return current;
			}

			if(productInCart.quantity <= 1) {
				return current.filter(item => item.id !== product.id)
			}

			return current.map( item => 
				item.id === product.id
				? {...item, quantity: item.quantity - 1}
				: item
			)
			

		});
	}

	const handleRemoveProduct = useCallback((product) => {
		setCart (current => current.filter(item => item.id !== product.id));
	}, [])

	const totalCart = useMemo(() => {
		return cart.reduce((acumulador, item)=> {
			return acumulador + (item.price * item.quantity);
		}, 0);
	}, [cart])

	const cartCount = useMemo(() => {
		return cart.reduce(
        	(total, item) => total + item.quantity,
        	0
    	);
	}, [cart])

    return(
        <CartContext.Provider value={{cart, handleAddToCart, handleDecreaseQuantity, handleRemoveProduct, totalCart, cartCount}}>
            {children}
        </CartContext.Provider>
    )

}