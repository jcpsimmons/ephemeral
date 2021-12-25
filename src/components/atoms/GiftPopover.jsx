import React, { useState } from 'react';
import styles from './GiftPopover.module.scss';

export default function GiftPopover({
  address,
  setIsGiftPopover,
  exchangeRate,
}) {
  const [selectedEth, setSelectedEth] = useState('???');

  const handleChange = (e) => {
    setSelectedEth(e.target.value);
  };

  const handleSubmit = (e) => {
    return null;
  };

  const handleRadioSelect = (e) => {
    setSelectedEth(e.target.value);
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
      <form className={styles.form}>
        <label for="denom1">Email</label>
        <input type="radio" id="denom1" name="contact" value="email" />

        <label for="denom2">Phone</label>
        <input type="radio" id="denom2" name="contact" value="phone" />

        <label for="denom3">Mail</label>
        <input type="radio" id="denom3" name="contact" value="mail" />

        <button type="submit">Send ETH</button>
      </form>
    </div>
  );
}
