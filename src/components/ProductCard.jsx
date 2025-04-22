import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, description, size, color, quantity }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt={description} className="product-img" />
        <h3>{description}</h3>
      </Link>
      <p>
        Talla: {size} | Color: {color}
      </p>
      <p>{quantity} en stock</p>
    </div>
  );
};

export default ProductCard;
