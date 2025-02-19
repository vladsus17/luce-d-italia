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
        {categories.map((type, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}>
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
