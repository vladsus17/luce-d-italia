import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { list } from '../components/Sort';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sortType: sort || { name: 'popular ↑', sortProperty: 'rating' },
        }),
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    setIsloading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://67b7308b2bddacfb270e0720.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((resp) => {
        if (resp.data.length === 0) {
          setItems([]);
        } else {
          setItems(resp.data);
        }
        setIsloading(false);
      })
      .catch((error) => {
        console.error('Error en la solicitud', error);
        setIsloading(false);

        setItems([]);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType.sortProperty, currentPage, navigate]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} />);

  const handleCategoryChange = (index) => {
    dispatch(setCategoryId(index));
    setCurrentPage(1);
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={handleCategoryChange} />
        <Sort />
      </div>
      <h2 className="content_title">Todas las pizzas</h2>
      <div className="content_items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
