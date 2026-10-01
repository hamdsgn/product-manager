import { useState, createContext } from 'react'

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({children}) => {
	const [favorites, setFavorites] = useState([]);
	
	function isFavorite(product) {
		return favorites.some ( 
			favorite => favorite.id === product.id
		)
	}
	
	function toggleFavorite(product){
		if (isFavorite(product)){
			setFavorites(current => current.filter(favorite => favorite.id !== product.id) )
		}else{
			setFavorites(current => [...current, product])
		}
	}
	
	return(
		<FavoritesContext.Provider value={{favorites, isFavorite, toggleFavorite}}>
			{children}
		</FavoritesContext.Provider>
	)
}
