import React from 'react';
import { debounce } from 'lodash';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  const inputRef = React.useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <svg viewBox="0 0 512 512" className={styles.icon} xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="Search_menu">
          <path d="M446.7578,435.4453l-90.5566-90.56a167.827,167.827,0,0,0,44.0761-113.2989c0-93.0156-75.6718-168.6875-168.6875-168.6875S62.8984,138.57,62.8984,231.5859,138.5742,400.2734,231.59,400.2734a167.8255,167.8255,0,0,0,113.2989-44.0761l90.5566,90.56a7.9991,7.9991,0,0,0,11.3125-11.3125ZM78.8984,231.5859c0-84.1953,68.4961-152.6875,152.6914-152.6875,84.1915,0,152.6875,68.4922,152.6875,152.6875S315.7813,384.2734,231.59,384.2734C147.3945,384.2734,78.8984,315.7813,78.8984,231.5859Z" />
          <path d="M355.9531,273.9375a7.9979,7.9979,0,0,0-8-8h-4.042A112.7358,112.7358,0,0,0,239.59,161.6162v-7.6787h3.6329a8,8,0,1,0,0-16h-23.27a8,8,0,0,0,0,16H223.59v7.6787A112.7361,112.7361,0,0,0,119.2646,265.9375h-4.0419a8,8,0,0,0,0,16h232.73A7.9979,7.9979,0,0,0,355.9531,273.9375Zm-220.7656-8a96.7322,96.7322,0,0,1,192.8008,0Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Buscar pizza..."
      />
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
