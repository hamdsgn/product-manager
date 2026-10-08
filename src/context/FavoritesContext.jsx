import { useState, createContext, useEffect } from 'react'

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({children}) => {
	const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

	useEffect(()=>{
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);
	
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

	const handleClearFavorites = () =>{
		setFavorites([]);
		localStorage.removeItem('favorites')
	}
	
	return(
		<FavoritesContext.Provider value={{favorites, isFavorite, toggleFavorite, handleClearFavorites}}>
			{children}
		</FavoritesContext.Provider>
	)
}
