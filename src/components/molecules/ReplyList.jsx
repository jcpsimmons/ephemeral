import React from 'react';
import Reply from '../atoms/Reply';
import styles from './ReplyList.module.scss';

export default function ReplyList({ replies }) {
  return (
    <div className={styles.replyList}>
      {replies.map(({ poster, content }, i) => (
        <Reply key={`${poster}${i}`} poster={poster} content={content} />
      ))}
    </div>
  );
}
