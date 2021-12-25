import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Reply.module.scss';
import GiftPopover from './GiftPopover';

export default function Reply({ poster, content }) {
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
      </p>
      <p>{content}</p>
      {isGiftPopover && (
        <GiftPopover address={poster} setIsGiftPopover={setIsGiftPopover} />
      )}
    </div>
  );
}
