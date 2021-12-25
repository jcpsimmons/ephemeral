import React, { useState } from 'react';
import styles from './GiftPopover.module.scss';

export default function GiftPopover({ address, setIsGiftPopover }) {
  const [selectedEth, setSelectedEth] = useState('???');

  const handleChange = (e) => {
    setSelectedEth(e.target.value);
  };

  const handleSubmit = (e) => {
    return null;
  };
  return (
    <div className={styles.giftPopover}>
      <button
        onClick={() => {
          setIsGiftPopover(false);
        }}
      >
        X
      </button>
      <h3>Give ETH to poster:</h3>
      <input></input>
      <button>Send ETH</button>
    </div>
  );
}
