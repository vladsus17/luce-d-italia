import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);

  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://67b7308b2bddacfb270e0720.mockapi.io/items')
      .then((resp) => {
        return resp.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsloading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content_title">Todas las pizzas</h2>
      <div className="content_items">
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
