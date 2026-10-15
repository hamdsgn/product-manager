import { createContext, useState } from "react";

export const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({children}) => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    const handlerecentlyViewed = (product) => {
		setRecentlyViewed(current => {
			const filtered = current.filter(
				item => item.id !== product.id
			)

			const updated = [product, ...filtered]

			return updated.slice(0,3)
		});
	}

    return(
        <RecentlyViewedContext.Provider value={{recentlyViewed, setRecentlyViewed, handlerecentlyViewed}}>
            {children}
        </RecentlyViewedContext.Provider>
    )
}