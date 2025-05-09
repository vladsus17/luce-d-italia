/*import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { list } from '../components/Sort';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

import { selectPizzaData } from '../redux/slices/pizzasSlice';
import { selectFilter } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const handleCategoryChange = (index) => {
    dispatch(setCategoryId(index));
    dispatch(setCurrentPage(1));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
  };
  React.useEffect(() => {
    getPizzas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortType, searchValue, currentPage, dispatch]);

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
    const queryString = qs.stringify({
      sortProperty: sortType.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType.sortProperty, currentPage, navigate]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} />);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={handleCategoryChange} />
        <Sort />
      </div>
      <h2 className="content_title">Todas las pizzas</h2>
      {status === 'failed' ? (
        <div className="content_error-info">
          <h2>
            Hemos tenido un error <span>😕</span>
          </h2>
          <p>No se ha podido cargar las pizzas, por favor intenta nuevamente más tarde.</p>
        </div>
      ) : (
        <div className="content_items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;*/

import React from 'react';
import GenderFilter from '../components/GenderFilter';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { list } from '../components/Sort';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchProducts, selectProductsData } from '../redux/slices/productsSlice';
import { selectFilter } from '../redux/slices/filterSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items = [], status = 'loading' } = useSelector(selectProductsData) || {};
  const { genderFilter } = useSelector(selectFilter);
  const filteredItems =
    genderFilter === 'Todos' ? items : items.filter((item) => item.gender === genderFilter);

  const handleCategoryChange = (index) => {
    dispatch(setCategoryId(index));
    dispatch(setCurrentPage(1));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sortType: sort || { name: 'Popular ↑', sortProperty: 'rating' },
        }),
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType.sortProperty, currentPage, navigate]);

  const skeletons = Array.from({ length: 9 }).map((_, index) => (
    <div key={index} className="placeholder-skeleton" />
  ));

  return (
    <div>
      <div className="content__top">
        <GenderFilter />
        <Sort />
      </div>
      <h2 className="content_title">Todos los productos</h2>
      {status === 'failed' ? (
        <div className="content_error-info">
          <h2>
            Hemos tenido un error <span>😕</span>
          </h2>
          <p>No se han podido cargar los productos, por favor intenta nuevamente más tarde.</p>
        </div>
      ) : (
        <div className="content_items">
          {status === 'loading'
            ? skeletons
            : filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  description={item.description}
                  size={item.size}
                  color={item.color}
                  quantity={item.quantity}
                  price={item.price}
                />
              ))}
        </div>
      )}
    </div>
  );
  <Pagination onChangePage={onChangePage} currentPage={currentPage} />;
};

export default Home;
