import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.scss';
import Thread from '../abis/Thread.json';
import Navbar from './molecules/Navbar.jsx';
import '@fontsource/ubuntu-mono';
import NewPost from './molecules/NewPost';
import ReplyList from './molecules/ReplyList';

export default function App2() {
  const [isLoading, setIsLoading] = useState(true);
  const [thread, setThread] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [accountAddy, setAccountAddy] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const [replies, setReplies] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const init = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };

    init();
    getExchangeRate();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccountAddy(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Thread.networks[networkId];
    if (networkData) {
      const thread = new web3.eth.Contract(Thread.abi, networkData.address);
      const replyCount = await thread.methods.replyCount().call();

      setReplyCount(replyCount);
      setThread(thread);
      getSetReplies(thread, replyCount);
    } else {
      window.alert('Thread contract not deployed to detected network.');
    }
  };

  const getExchangeRate = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    const data = await res.json();

    setExchangeRate(data.ethereum.usd);
  };

  const getSetReplies = async (curThread, howMany) => {
    const replies = [];
    for (let i = howMany; i > -1; i--) {
      const reply = await curThread.methods.replies(i).call();
      reply.poster !== '0x0000000000000000000000000000000000000000' &&
        replies.unshift(reply);
    }

    const replyCount = await curThread.methods.replyCount().call();

    setReplies(replies);
    setReplyCount(replyCount);
    setIsLoading(false);
  };

  const addReply = async () => {
    setIsLoading(true);
    await thread.methods
      .addReply(currentMessage)
      .send({ from: accountAddy })
      .once('confirmation', () => {
        console.log('CONFIRMED');
      })
      .then(() => {
        setCurrentMessage('');
        getSetReplies(thread, replyCount + 1);
        setIsLoading(false);
      })
      .catch(console.log);
  };

  return (
    <div>
      <Navbar account={accountAddy} replyCount={replyCount} />
      <div>
        <div>
          <main role="main">
            {isLoading ? (
              <div id="loader">
                <p>Loading...</p>
              </div>
            ) : (
              <div>
                <ReplyList
                  {...{ replies, exchangeRate, thread, accountAddy }}
                />

                <NewPost {...{ setCurrentMessage, currentMessage, addReply }} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
