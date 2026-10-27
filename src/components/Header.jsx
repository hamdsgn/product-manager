import QuickAccessMenu from "./QuickAccessMenu";
import { Link } from "react-router-dom";

function Header(){
    return(
        <header className='header section'>
            <Link to="/"><h1>Mi Tienda</h1></Link>
            <nav className="main-menu">
                <ul>
                    <li><Link to="/favoritos">Favoritos</Link></li>
                    <li><Link to="/categorias">Categorías</Link></li>
                </ul>
            </nav>
            <QuickAccessMenu/>
        </header>
    )
}

export default Header;