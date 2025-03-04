import React from 'react';
import { Link } from 'react-router';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Carrito vacío <span>😕</span>
      </h2>
      <p>
        Todavía no has elegido ninguna pizza
        <br />
        Para seleccionar una pizza, vuelve a la página de inicio
      </p>
      <img
        src="https://th.bing.com/th/id/R.fa1adfbc8e3cbf8cff0dfcef8451a0ae?rik=dO9KowpgvDG9Rg&riu=http%3a%2f%2fmedia.istockphoto.com%2fvectors%2fshopping-woman-vector-id496800927%3fk%3d6%26m%3d496800927%26s%3d612x612%26w%3d0%26h%3d8jykDET277h7DZCh9RUgjkfa59RR7mbipvHCzo5DtsY%3d&ehk=jYI7TD9wwM7xNIREiIGKlHidrFuu4%2feDrhpBdew6hl4%3d&risl=&pid=ImgRaw&r=0"
        alt="Ilustración de carrito vacío"
      />
      <Link to="/" className="button button--black">
        <span>Volver</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
