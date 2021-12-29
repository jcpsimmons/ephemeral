import React, { useState } from 'react';

import Thread from '../../abis/Thread.json';

import styles from './About.module.scss';

export default function About({ networkId, contractAddress }) {
  const [isOpen, setIsOpen] = useState(false);

  const generateEtherscanUrl = (contractAddress) => {
    return `https://${
      networkId == 42 ? 'kovan.' : ''
    }etherscan.io/address/${contractAddress}#events`;
  };

  return (
    <>
      <div
        className={styles.about}
        tabIndex={0}
        onClick={() => setIsOpen(true)}
      >
        <img src={`${process.env.PUBLIC_URL}/about.gif`} alt="about gif" />
      </div>
      {isOpen && (
        <div className={styles.modal}>
          <button onClick={() => setIsOpen(false)} className={styles.close}>
            X
          </button>
          <div className={styles.content}>
            <h2>A Really Free Conversation (a Small Manifesto)</h2>
            <p>
              This is an open source project that runs on the Ethereum
              blockchain and uses React for the frontend.
            </p>
            <p>
              In light of increased censorship on online platforms -
              specifically on Reddit - I wanted to work towards creating an
              alternative way of communicating online that can't be censored.
              The Ethereum blockchain seemed like a good candidate towards that
              end.
            </p>
            <p>
              Fuck censorship, fuck people with pushy political ideals that they
              want to force people to conform to, and fuck being offended. I'm
              so fucking tired of everyone being so touchy about everything
              online.
            </p>

            <h3>
              <i>Disclaimer</i>
            </h3>
            <p>You view this site at your own risk.</p>
            <p>
              I can't control what is posted here. It is anonymous in the sense
              that the only identifying information this site is tracking is
              your Ethereum address. I will make no attempts to moderate this
              space. Even if I could remove posts from the frontend they will
              still exist on the blockchain. After a full iteration of 100
              posts, I think old replies will still be viewable on Etherscan:
              {contractAddress && (
                <a
                  href={generateEtherscanUrl(contractAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.etherscanLink}
                >
                  View Contract on Etherscan
                </a>
              )}
            </p>

            <h3>How it Works: TLDR Version</h3>
            <p>
              An iteration consists of 999999 replies. Once a reply is posted it
              can't be edited or deleted. Once reply 1000000 is posted, the
              conversation zeroes out and we move on to the next iteration. If
              you like what someone posted, click their address and send them
              some ETH.
            </p>

            <h3>The Site Looks Like Shit!</h3>
            <p>
              Fuck you, the design language set forth by personal websites in
              the 90s (Geocities, blog rings, etc.) was the pinnacle of web
              design. I see myself as part of this lineage. The design of this
              site refutes everything I hate about Web 2.0. Components are
              seldom (if ever) reused, the CSS is 1:1 linked to each UI element,
              there are a bunch of fun GIFs, and I've written a
              not-very-politically-correct manifesto to cap things off.
            </p>
            <p>
              This style is superior to any other site that uses a "CSS
              framework". Bootstrap, Material, Tailwind, and the like can get
              fucked. CSS frameworks refute individuality and stomp on
              creativity - they're great for large corporations and even then
              I'm not convinced.
            </p>
            <p>The JS is pretty modern and clean.</p>

            <h3>Who Are You? Why Are You So Angry?</h3>
            <p>
              I'm{' '}
              <a target="_blank" href="https://jcsdesign.me" rel="noreferrer">
                Josh Simmons
              </a>{' '}
              and I'm so pissed off because the web used to be really cool. I
              was really sick when I was a kid and spent a bunch of time on the
              web in the 90s. It was genuinely creative at that point. Less
              codified, less structured, less formal, less "best practices". I'm
              fighting to bring elements of that version of the internet back -
              I believe decentralized applications could be a way to do that.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
