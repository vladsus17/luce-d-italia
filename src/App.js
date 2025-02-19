import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content_title">Todas las pizzas</h2>
          <div className="content_items">
            <PizzaBlock title="Barbacoa" price="8" />
            <PizzaBlock title="4 Quesos" price="7" />
            <PizzaBlock title="Mexicana" price="8" />
            <PizzaBlock title="4 Quesos" price="7" />
            <PizzaBlock title="Pizza Vlad" price="10" />
            <PizzaBlock title="Margarita" price="6" />
            <PizzaBlock title="PulledPork" price="7" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
