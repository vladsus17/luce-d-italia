import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>Ups...</span>
        <br />
        No se ha encontrado nada
      </h1>
    </div>
  );
};

export default NotFoundBlock;
