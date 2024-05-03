import React from 'react';
import styles from './Buttons.module.css';

const Buttons = ({ inputHandler, clearInput, backspace, changePlusMinus, calculateAns }) => {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('equalbtn').click();
    }
  });

  return (
    <div className={styles['show-btn']}>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        ^
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        (
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        )
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        √
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        x<sup>2</sup>
      </button>
      <button className={`${styles.btn} ${styles.clr}`} onClick={clearInput}>
        AC
      </button>
      <button className={`${styles.btn} ${styles.clr}`} onClick={backspace}>
        ⌫
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        log
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        ÷
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        %
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        7
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        8
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        9
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        x
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        x<sup>3</sup>
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        4
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        5
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        6
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        -
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        <sup>3</sup>√
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        1
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        2
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        3
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        +
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        !
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={changePlusMinus}>
        ±
      </button>
      <button className={styles.btn} onClick={inputHandler}>
        0
      </button>
      <button className={`${styles.btn} ${styles.exp}`} onClick={inputHandler}>
        .
      </button>
      <button className={`${styles.btn} ${styles.exp} ${styles.equal}`} id="equalbtn" onClick={calculateAns}>
        =
      </button>
    </div>
  );
};

export default Buttons;
