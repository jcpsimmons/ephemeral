import React from 'react';
import Reply from '../atoms/Reply';
import Tooltip from '../atoms/Tooltip';
import styles from './ReplyList.module.scss';

export default function ReplyList({
  replies,
  exchangeRate,
  thread,
  accountAddy,
}) {
  return (
    <div className={styles.replyList}>
      {replies.map(({ poster, content }, i) => (
        <Reply
          key={`${poster}${i}`}
          poster={poster}
          content={content}
          exchangeRate={exchangeRate}
          thread={thread}
          accountAddy={accountAddy}
          isFirst={i === 0}
        />
      ))}
    </div>
  );
}
