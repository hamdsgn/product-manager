import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

function cartReducer(state, action) {
	switch(action.type){

		case "ADD":{
			const product = action.payload;
			const exist = state.some(item => item.id === product.id);
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

		case "DECREASE":{
			const product = action.payload;
			const productIn = state.find(item => item.id === product.id);
			if(!productIn){
				return state;
			}
			if (productIn.quantity <= 1) {
				return (state.filter(
					item => item.id !== product.id
				));
			}
			return(state.map(item => 
				item.id === product.id 
					? {...item, quantity: item.quantity - 1} 
					: item
			));
		}
		
		case "REMOVE": {
			const product = action.payload
			return state.filter(item => item.id !== product.id);
		}
		
		default:
			return state;
	}
}

function getInitialCart() {
	try {
		const initialCart = JSON.parse(localStorage.getItem('cart'));

		if(!Array.isArray(initialCart)){
			return[];
		}
		return initialCart;
	} catch(e) {
		return [];
	}
}

export const CartProvider = ({children}) => {

	const [cart, dispatch] = useReducer(
		cartReducer, 
		[], 
		getInitialCart
	);

    useEffect(()=>{
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

    const handleAddToCart = (product) => {
        dispatch({
			type: "ADD",
			payload: product
		});
    };

	const handleDecreaseQuantity = (product) => {
		dispatch({
			type:"DECREASE", 
			payload:product
		});
	}

	const handleRemoveProduct = (product) => {
		dispatch({
			type: "REMOVE",
			payload: product
		})
	}

	const totalCart = cart.reduce(
		(total, item)=> total + (item.price * item.quantity),
		0
	);

	const cartCount = cart.reduce(
		(total, item) => total + item.quantity,
		0
	);

    return(
        <CartContext.Provider value={{cart, handleAddToCart, handleDecreaseQuantity, handleRemoveProduct, totalCart, cartCount}}>
            {children}
        </CartContext.Provider>
    )

}