import React from 'react';

import cn from 'classnames';

import styles from './Header.module.scss';

export default function Header({ account, replyCount }) {
  return (
    <nav className={cn(styles.header, 'bg-subdued')}>
      <div>
        <h1>
          Welcome to <span className="limegreen">Ephemeral</span>,
        </h1>
      </div>
      <div>
        <p className={cn('small', 'address')}>{account}</p>
      </div>
      <div>
        <p className="small">Current Iteration {replyCount}/99</p>
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/talkingmiling.gif`}
          alt="smiling talking gif"
        />
      </div>
    </nav>
  );
}
