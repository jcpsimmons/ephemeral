import React from 'react';

import styles from './NewPost.module.scss';

export default function NewPost({
  setCurrentMessage,
  currentMessage,
  addReply,
}) {
  const handleChange = (e) => {
    if (currentMessage.length < 1000) {
      setCurrentMessage(e.target.value);
    }
  };

  return (
    <form
      onSubmit={() => {
        currentMessage.length < 1000 && addReply(currentMessage);
      }}
      className={styles.newPost}
    >
      <h3>Join the conversation</h3>
      <textarea
        rows={7}
        onChange={handleChange}
        value={currentMessage}
        maxLength={999}
      />

      <span className={styles.error}>Max characters allowed: 999</span>

      <button type="submit">Send Reply</button>
    </form>
  );
}
