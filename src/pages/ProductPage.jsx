
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getProduct() {
      setLoading(true);
      setError(null);
      setProduct(null);

      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('No se pudo cargar el producto');
        }

        const data = await response.json();

        if (!data || data.id == null) {
          throw new Error('Producto no encontrado');
        }

        setProduct(data);
      } catch (e) {
        if(e.name !== 'AbortError') {
            setError(e.message);
        }
      } finally {
        if (!controller.signal.aborted){
            setLoading(false);
        }
      }
    }

    getProduct();

    return () => {
        controller.abort();
    };
  }, [id]);

  if (loading) {
    return <p className="loading-message">Cargando producto...</p>;
  }

  if (error) {
    return (
      <main className="section">
        <p className="error-message">{error}</p>
        <Link className='btn btn--secondary' to="/">Volver a la tienda</Link>
      </main>
    );
  }

  return (
    <main className="section">
      <Link className='btn btn--secondary' to="/">Volver a la tienda</Link>

      <article>
        <h1>{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          width="250"
        />
        <p>{product.category}</p>
        <p>{product.description}</p>
        <p><strong>{product.price} €</strong></p>
      </article>
    </main>
  );
}

export default ProductPage;