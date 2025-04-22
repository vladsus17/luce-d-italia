import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        const fields = data.fields;
        setProduct({
          id: data.id,
          description: fields['Description'],
          size: fields['Size'],
          color: fields['Color'],
          quantity: fields['Quantity'],
          image: fields['Item Photo']?.[0]?.thumbnails?.large?.url || '',
        });
      } catch (error) {
        alert('No se pudo cargar el producto.');
        navigate('/');
      }
    }
    fetchProduct();
  }, [id, navigate]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="product-container">
      <div className="product-details">
        <img className="product-img" src={product.image} alt={product.description} />
        <h2>{product.description}</h2>
        <div className="product-info">
          <p>
            <strong>Talla:</strong> {product.size}
          </p>
          <p>
            <strong>Color:</strong> {product.color}
          </p>
          <p>
            <strong>Stock:</strong> {product.quantity}
          </p>
        </div>
        <Link to="/" className="back-button">
          <span>← Volver</span>
        </Link>
      </div>
    </div>
  );
};

export default FullProduct;
