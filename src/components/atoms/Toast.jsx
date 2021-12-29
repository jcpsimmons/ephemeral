import React from 'react';

import styles from './Toast.module.scss';

export default function Toast({ message }) {
  return (
    <div className={styles.toast}>
      <p>{message}</p>
    </div>
  );
}
