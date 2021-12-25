import React from 'react';
import styles from './Tooltip.module.scss';

export default function Tooltip() {
  return (
    <div className={styles.tooltip}>
      <h1>👈</h1>
      <h2>Click Here</h2>
      <p>to give a poster some ETH</p>
    </div>
  );
}
