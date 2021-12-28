import React, { useState } from 'react';

import GiftPopover from './GiftPopover';
import Tooltip from './Tooltip';
import cn from 'classnames';

import styles from './Reply.module.scss';

export default function Reply({
  poster,
  content,
  exchangeRate,
  thread,
  accountAddy,
  isFirst,
}) {
  const [isGiftPopover, setIsGiftPopover] = useState(false);

  const handleAddressClick = () => {
    setIsGiftPopover(true);
  };

  return (
    <div className={cn('bg-subdued', styles.reply)}>
      <p
        className={cn(styles.address, 'small address')}
        onClick={handleAddressClick}
      >
        {poster}
        {isFirst && <Tooltip />}
      </p>
      <p>{content}</p>
      {isGiftPopover && (
        <GiftPopover
          address={poster}
          setIsGiftPopover={setIsGiftPopover}
          exchangeRate={exchangeRate}
          thread={thread}
          senderAccount={accountAddy}
        />
      )}
    </div>
  );
}
