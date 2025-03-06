/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get('https://67b7308b2bddacfb270e0720.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Error: no se ha encontrado la informacion sobre la pizza :(', error);
        navigate('/');
      }
    }

    fetchPizzas();
  }, [id, navigate]);

  if (!pizza) {
    return 'Cargando...';
  }
  return (
    <div className="pizza-container">
      <div className="pizza-details">
        <img className="fullPizza-Img" src={pizza.image} alt={pizza.title} />
        <h2>{pizza.title}</h2>
        <div className="pizza-info">
          <p>Precio: {pizza.price} €</p>
          <p>Ingredientes: Proximamente...</p>
          <p>Observaciones: Proximamente...</p>
        </div>
        <Link to="/" className="back-button">
          <span>Volver</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
