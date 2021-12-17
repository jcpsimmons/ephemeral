import React from 'react';

export default function Navbar({ account, replyCount }) {
  return (
    <nav>
      <div>
        <span>Welcome to Ephemeral</span>
      </div>
      <div>
        <span>{account}</span>
      </div>
      <div>Current Iteration {replyCount}/999999</div>
    </nav>
  );
}
