import { Link, useParams } from "react-router-dom";

function ProductPage() {
    const { id } = useParams();

    return(
        <>
            <header className="section">
                <h1>Pagina de producto</h1>
            </header>
            <main className="section">
                <h2>Detalle del producto</h2>
                <p>id del producto:{id}</p>
                <Link to="/">Volver a la tienda</Link>
            </main>
        </>
    );

}

export default ProductPage;