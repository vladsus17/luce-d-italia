import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'popular ↑',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsloading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    fetch(
      `https://67b7308b2bddacfb270e0720.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${order}`,
    )
      .then((resp) => {
        return resp.json();
      })
      .then((arr) => {
        setItems(Array.isArray(arr) ? arr : []);
        setIsloading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
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
