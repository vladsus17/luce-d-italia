import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      pageClassName={styles.page}
      activeClassName={styles.selected}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
