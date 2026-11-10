import { Link } from "react-router-dom"
import Header from "../components/Header"
function CategoryPage(){
    return(
        <main>
            <Header/>
            <ul>
                <li>
                    <Link to={"/categorias/electronics"}>Electrónica</Link>
                </li>
                <li>
                    <Link to={"/categorias/men's clothing"}>Ropa de hombre</Link>
                </li>
                <li>
                    <Link to={"/categorias/jewelery"}>Joyas</Link>
                </li>
                <li>
                    <Link to={"/categorias/women's clothing"}>Ropa de mujer</Link>
                </li>
            </ul>
        </main>
    )
}

export default CategoryPage