import React from 'react';

export default function NewPost({
  setCurrentMessage,
  currentMessage,
  addReply,
}) {
  return (
    <div>
      <input onChange={(e) => setCurrentMessage(e.target.value)} />
      <button onClick={() => addReply(currentMessage)}>Submit</button>
    </div>
  );
}
