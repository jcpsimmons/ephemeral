import React from 'react';
import styles from './Scroller.module.scss';

export default function Scroller() {
  return (
    <button className={styles.scroller} tabIndex={0}>
      <p>Scroll to bottom</p>
      <img src={`${process.env.PUBLIC_URL}/down.gif`} alt="down gif" />
    </button>
  );
}
