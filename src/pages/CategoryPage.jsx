import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

function CategoryPage(){
    const {category} = useParams();

    return(
        <>
            <Header/>
            <main className="section">
                <Link to="/" className="btn btn--secondary">Volver a la tienda</Link>

                

            </main>
        
        </>
    )
}

export default CategoryPage;