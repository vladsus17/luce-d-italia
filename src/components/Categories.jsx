import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  const categories = ['Todas', 'Carnivoras', 'Vegetarianas', 'Grill', 'Picantes', 'Calzone'];

  return (
    <div className="categories">
      <ul>
        {categories.map((pizzaName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}>
            {pizzaName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
