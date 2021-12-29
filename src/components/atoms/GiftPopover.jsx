import React, { useState } from 'react';

import { usdToEth } from '../utils/moneyConversion';
import cn from 'classnames';
import Draggable from 'react-draggable';

import styles from './GiftPopover.module.scss';

export default function GiftPopover({
  address,
  setIsGiftPopover,
  exchangeRate,
  thread,
  senderAccount,
}) {
  const [selectedEth, setSelectedEth] = useState(10);
  const [txState, setTxState] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTxState('Transaction Pending');

    const ethToSend = usdToEth(exchangeRate, selectedEth);

    thread.methods
      .payPoster(address)
      .send({
        from: senderAccount,
        value: window.web3.utils.toWei(ethToSend, 'ether'),
      })
      .on('transactionHash', () => {
        setTxState('Transaction Sent - Pending Confirmation');
      })
      .on('error', () => {
        updateStatusCloseModal(
          'There was an error processing your transaction - no ETH was sent. Try again later.'
        );
      })
      .on('confirmation', () => {
        updateStatusCloseModal('Transaction Confirmed');
      })
      .catch(console.log);
  };

  const updateStatusCloseModal = (message) => {
    setTxState(message);
    setTimeout(() => {
      setIsGiftPopover(false);
    }, 2000);
  };

  const handleRadioSelect = (e) => {
    setSelectedEth(parseInt(e.target.value));
  };

  return (
    <Draggable handle=".handle">
      <div className={styles.giftPopover}>
        <div className={cn(styles.appBar, 'handle')}>
          <marquee>{`ETH Gift To: ${address}`}</marquee>
          <button
            onClick={() => {
              setIsGiftPopover(false);
            }}
          >
            X
          </button>
        </div>
        {!txState ? (
          <>
            <h4>Give ETH to poster:</h4>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="one">$1</label>
              <input
                type="radio"
                id="one"
                value={1}
                checked={selectedEth === 1}
                onChange={handleRadioSelect}
              />

              <label htmlFor="ten">$10</label>
              <input
                type="radio"
                id="ten"
                value={10}
                checked={selectedEth === 10}
                onChange={handleRadioSelect}
              />

              <label htmlFor="twentyfive">$25</label>
              <input
                type="radio"
                id="twentyfive"
                value={25}
                checked={selectedEth === 25}
                onChange={handleRadioSelect}
              />

              <label htmlFor="hundo">$100</label>
              <input
                type="radio"
                id="hundo"
                value={100}
                checked={selectedEth === 100}
                onChange={handleRadioSelect}
              />

              <button type="submit">{`Send $${selectedEth}`}</button>
              <span className={styles.ethConversion}>{`That's ${usdToEth(
                exchangeRate,
                selectedEth
              )} ETH`}</span>
              <span className={styles.disclaimer}>
                5% of each transaction goes to the webmaster for maintenance and
                hosting fees.
              </span>
            </form>

            <div className={styles.money}>
              <img
                src={`${process.env.PUBLIC_URL}/money.gif`}
                alt="money money money gif"
              />
            </div>
          </>
        ) : (
          <div>
            <h2>{txState}</h2>
          </div>
        )}
      </div>
    </Draggable>
  );
}
