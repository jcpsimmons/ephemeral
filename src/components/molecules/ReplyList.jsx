import React from 'react';
import Reply from '../atoms/Reply';
import styles from './ReplyList.module.scss';

export default function ReplyList({ replies, exchangeRate }) {
  return (
    <div className={styles.replyList}>
      {replies.map(({ poster, content }, i) => (
        <Reply
          key={`${poster}${i}`}
          poster={poster}
          content={content}
          exchangeRate={exchangeRate}
        />
      ))}
    </div>
  );
}
