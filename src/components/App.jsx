import React, { useEffect, useState } from 'react';

import Thread from '../abis/Thread.json';
import { dummyReplies } from './utils/fillerData';
import '@fontsource/ubuntu-mono';
import Web3 from 'web3';

import NotConnectedModal from './atoms/NotConnectedModal';
import Scroller from './atoms/Scroller';
import Toast from './atoms/Toast';
import About from './molecules/About';
import Header from './molecules/Header.jsx';
import NewPost from './molecules/NewPost';
import ReplyList from './molecules/ReplyList';

import './App.scss';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [thread, setThread] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [accountAddy, setAccountAddy] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const [replies, setReplies] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [web3NetId, setWeb3NetId] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [isNotConnectedError, setIsNotConnectedError] = useState(false);
  const [toast, setToast] = useState(null);

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
      setIsNotConnectedError(true);
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccountAddy(accounts[0]);
    const networkId = await web3.eth.net.getId();
    setWeb3NetId(networkId);
    const networkData = Thread.networks[networkId];
    if (networkData) {
      setContractAddress(networkData.address);
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
      reply?.poster !== '0x0000000000000000000000000000000000000000' &&
        replies.unshift(reply);
    }

    const replyCount = await curThread.methods.replyCount().call();

    if (replies.length) {
      setReplies(replies);
      setReplyCount(replyCount);
    } else {
      setReplies(dummyReplies);
      setReplyCount(1);
    }
    setIsLoading(false);
  };

  const addReply = async () => {
    setIsLoading(true);
    await thread.methods
      .addReply(currentMessage)
      .send({ from: accountAddy })
      .on('error', () => {
        setToast(
          `There was an error posting your reply. Please try again later`
        );

        setTimeout(() => {
          setToast(null);
        }, 5000);

        setIsLoading(false);
      })
      .on('transactionHash', (hash) => {
        setToast(
          `Your reply has been posted! It may take a minute to appear here. Transaction hash: ${hash}`
        );

        setTimeout(() => {
          setToast(null);
        }, 5000);

        setIsLoading(false);
        setCurrentMessage('');
      })
      .on('confirmation', () => {
        getSetReplies(thread, replyCount + 1);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isNotConnectedError && <NotConnectedModal />}
      {toast && <Toast message={toast} />}
      <About networkId={web3NetId} contractAddress={contractAddress} />
      <Header account={accountAddy} replyCount={replyCount} />
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
      <Scroller />
    </div>
  );
}
