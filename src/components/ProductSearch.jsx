import './styleComponents.css';

function ProductSearch({ products, setSearchTerm, setSearchCat, searchCat, searchTerm, searchOrder, setSearchOrder }) {

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <>
    <div className='contentForm'>
      <input 
        type="text" 
        placeholder="Buscar producto..." 
        name="search"
        value = {searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        name="category"
        value={searchCat}
        onChange={(e) => setSearchCat(e.target.value)}
      >
        <option value="todas">Todas las categorías</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <select
        name="order"
        value={searchOrder}
        onChange={(e) => setSearchOrder(e.target.value)}
      >
        <option value="1">Precio: de menor a mayor.</option>
        <option value="2">Precio: de mayor a menor.</option>
        <option value="3">Nombre: de A a Z.</option>
        <option value="4">Nombre: de Z a A.</option>
      </select>
      <button onClick={() => {
        setSearchTerm("");
        setSearchCat("todas");
        setSearchOrder("1")
      }}>
        Limpiar filtros
      </button>
    </div>
    </>
  )
}

export default ProductSearch