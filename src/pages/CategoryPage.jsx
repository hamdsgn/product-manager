import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";



function CategoryPage(){
    const {category} = useParams();

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getCategory() {
            setLoading(true);
            setProduct(null);
            setError(null);
    
            try {
                const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
                if(!response.ok){
                    throw new Error("No se ha podido acceder a los datos");
                }
        
                const data = await response.json();
                if(!data){
                    throw new Error("Categoría no encontrada");
                }
        
                setProduct(data);
                
            } catch (e) {
                setError(e.message)
            }finally{
                setLoading(false);
            }
        }
        getCategory();
    }, [category])

    return(
        <>
            <Header/>
            <main className="section">
                <Link to="/" className="btn btn--secondary">Volver a la tienda</Link>
                {product.map(item => (
                        <p key={item.id}>{item.title}</p>
                ))}
            </main>
        
        </>
    )
}

export default CategoryPage;