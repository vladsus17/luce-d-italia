import { useDispatch, useSelector } from 'react-redux';
import { setGenderFilter, selectFilter } from '../redux/slices/filterSlice';

const GenderFilter = () => {
  const dispatch = useDispatch();
  const { genderFilter } = useSelector(selectFilter);

  const genders = ['Todos', 'Hombre', 'Mujer'];

  return (
    <div className="categories">
      <ul>
        {genders.map((gender) => (
          <li
            key={gender}
            onClick={() => dispatch(setGenderFilter(gender))}
            className={genderFilter === gender ? 'active' : ''}>
            {gender}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenderFilter;
