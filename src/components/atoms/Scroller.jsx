import React from 'react';
import styles from './Scroller.module.scss';

export default function Scroller() {
  const handleClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={styles.scroller} tabIndex={0} onClick={handleClick}>
      <p>Scroll to bottom</p>
      <img src={`${process.env.PUBLIC_URL}/down.gif`} alt="down gif" />
    </button>
  );
}
