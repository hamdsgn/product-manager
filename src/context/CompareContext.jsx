import { createContext, useState, useEffect } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({children}) => {
    // const [productsCompare, setProductsCompare] = useState([]);
    const [productsCompare, setProductsCompare] = useState(JSON.parse(localStorage.getItem('compare')) || []);
    const [showMessageCompare, setShowMessageCompare] = useState(false);

    useEffect(()=> {
        localStorage.setItem('compare', JSON.stringify(productsCompare))
    }, [productsCompare])

    const handleProductsCompare = (product) => {
		setProductsCompare(current =>{

			const exist = current.some(item => item.id === product.id)

			if (exist === true){
				const addCompare =  current.filter(
					item => item.id !== product.id
				)
				
				return addCompare
			} else {
				if(current.length < 3){

					const update = [...current, product]

					return update
				}
				return current
			}
		})
	}

    useEffect(()=>{
        if(productsCompare.length !== 3){
            setShowMessageCompare(false);
            return;
        }

        setShowMessageCompare(true);

        const timer = setTimeout(() => {
            setShowMessageCompare(false)
        }, 2000);

        return () => {
            clearTimeout(timer);
        }
    }, [productsCompare]);

    

	const handleRemoveProductCompare = (product) => {
		setProductsCompare(current=> {
			return current.filter(item => item.id !== product.id)
		})
	}

    return(
        <CompareContext.Provider 
            value={{productsCompare, handleProductsCompare, handleRemoveProductCompare, showMessageCompare, setShowMessageCompare}}
        >
            {children}
        </CompareContext.Provider>
    )
}