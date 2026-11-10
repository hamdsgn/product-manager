import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";



function CategorySinglePage(){
    const {category} = useParams();

    const [products, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const controller = new AbortController();
        
        async function getCategory() {
            setLoading(true);
            setProduct(null);
            setError(null);
    
            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/category/${category}`,
                    { signal : controller.signal}
                );
                if(!response.ok){
                    throw new Error("No se ha podido acceder a los datos");
                }
        
                const data = await response.json();
                if(!Array.isArray(data)){
                    throw new Error("La respuesta no tiene el formato esperado");
                }
        
                setProduct(data);
                
            } catch (e) {
                if(e.name !== "AbortError") {
                    setError(e.message)
                }
            }finally{
                if(!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        getCategory();
        return() => {
            controller.abort()
        }
    }, [category]);

    if (loading) {
        return (
            <>
                <Header/>
                <main>
                    <p className="loading-message">Cargando Categoría...</p>;   
                </main>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Header/>
                <main className="section">
                    <p className="error-message">{error}</p>
                    <Link className='btn btn--secondary' to="/">Volver a la tienda</Link>
                </main>
            </>
        );
    }

    return(
        <>
            <Header/>
            <main className="section">
                <Link to="/" className="btn btn--secondary">Volver a la tienda</Link>
                    <ProductList
                        products={products}
                    />
            </main>
        
        </>
    )
}

export default CategorySinglePage;