import React from 'react';

import styles from './NotConnectedModal.module.scss';

export default function NotConnectedModal() {
  return (
    <div className={styles.ncModal}>
      <div className={styles.text}>
        <h1>ERROR</h1>
        <p>
          You are not connected to the Ethereum network. Please connect to the
          Ethereum network and refresh the page (or else the app won't work).
        </p>
        <p>
          You can use the MetaMask browser plugin to establish a connection to
          the mainnet.
        </p>
      </div>
    </div>
  );
}
