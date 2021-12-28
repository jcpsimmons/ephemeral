import React from 'react';

import styles from './Tooltip.module.scss';

export default function Tooltip() {
  return (
    <div className={styles.tooltip}>
      <h1 className={styles.pointer}>👈</h1>
      <p>Click the address to send a poster some ETH</p>
    </div>
  );
}
