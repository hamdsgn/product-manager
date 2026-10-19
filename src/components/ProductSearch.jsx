import './styleComponents.css';

function ProductSearch({
    products,
    setSearchTerm,
    setSearchCat,
    searchCat,
    searchTerm,
    searchOrder,
    setSearchOrder
}) {
    const categories = [
        ...new Set(products.map(product => product.category))
    ];

    return (
        <aside className="productSearch">

            {/* Buscador */}
            <input
                className="productSearch__input"
                type="text"
                placeholder="Buscar producto..."
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Categorías */}
            <section className="productSearch__section">
                <h3 className="productSearch__title">
                    Categorías
                </h3>

                <div className="productSearch__options">
                    <label className="productSearch__option">
                        <input
                            type="radio"
                            name="categories"
                            value="todas"
                            checked={searchCat === "todas"}
                            onChange={(e) => setSearchCat(e.target.value)}
                        />
                        Todas las categorías
                    </label>

                    {categories.map((category) => (
                        <label
                            className="productSearch__option"
                            key={category}
                        >
                            <input
                                type="radio"
                                name="categories"
                                value={category}
                                checked={searchCat === category}
                                onChange={(e) => setSearchCat(e.target.value)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </section>

            <hr className="productSearch__divider" />

            {/* Ordenación */}
            <section className="productSearch__section">
                <h3 className="productSearch__title">
                    Ordenar por
                </h3>

                <div className="productSearch__options">
                    <label className="productSearch__option">
                        <input
                            type="radio"
                            name="orderBy"
                            value="1"
                            checked={String(searchOrder) === "1"}
                            onChange={(e) => setSearchOrder(e.target.value)}
                        />
                        Precio: menor a mayor
                    </label>

                    <label className="productSearch__option">
                        <input
                            type="radio"
                            name="orderBy"
                            value="2"
                            checked={String(searchOrder) === "2"}
                            onChange={(e) => setSearchOrder(e.target.value)}
                        />
                        Precio: mayor a menor
                    </label>

                    <label className="productSearch__option">
                        <input
                            type="radio"
                            name="orderBy"
                            value="3"
                            checked={String(searchOrder) === "3"}
                            onChange={(e) => setSearchOrder(e.target.value)}
                        />
                        Nombre: A–Z
                    </label>

                    <label className="productSearch__option">
                        <input
                            type="radio"
                            name="price"
                            value="4"
                            checked={String(searchOrder) === "4"}
                            onChange={(e) => setSearchOrder(e.target.value)}
                        />
                        Nombre: Z–A
                    </label>
                </div>
            </section>

            <hr className="productSearch__divider" />

            {/* Limpiar filtros */}
            <button
                type="button"
                className="btn btn--secondary productSearch__clear"
                onClick={() => {
                    setSearchTerm("");
                    setSearchCat("todas");
                    setSearchOrder("1");
                }}
            >
                Limpiar filtros
            </button>

        </aside>
    );
}

export default ProductSearch;