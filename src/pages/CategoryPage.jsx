import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Signal } from "lucide-react";



function CategoryPage(){
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
                if(!data || data.id == null){
                    throw new Error("Categoría no encontrada");
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
    }, [category]);

    if (loading) {
        return <p className="loading-message">Cargando Categoría...</p>;
    }

    if (error) {
        return (
        <main className="section">
            <p className="error-message">{error}</p>
            <Link className='btn btn--secondary' to="/">Volver a la tienda</Link>
        </main>
        );
    }

    return(
        <>
            <Header/>
            <main className="section">
                <Link to="/" className="btn btn--secondary">Volver a la tienda</Link>
                {products.map(item => (
                        <p key={item.id}>{item.title}</p>
                ))}
            </main>
        
        </>
    )
}

export default CategoryPage;