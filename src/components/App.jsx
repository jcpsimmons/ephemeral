import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Thread from '../abis/Thread.json';
import Navbar from './molecules/Navbar.jsx';
import Main from './Main';

export default function App2() {
  const [isLoading, setIsLoading] = useState(true);
  const [thread, setThread] = useState(null);
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
      const thread = web3.eth.Contract(Thread.abi, networkData.address);
      const replyCount = await thread.methods.replyCount().call();

      setReplyCount(replyCount.toNumber());
      setThread(thread);
      getSetReplies(thread, replyCount.toNumber());
    } else {
      window.alert('Thread contract not deployed to detected network.');
    }
  };

  const getSetReplies = async (curThread, howMany) => {
    const replies = [];
    for (let i = howMany + 1; i > -1; i--) {
      const reply = await curThread.methods.replies(i).call();
      replies.push(reply);
    }

    setReplies(replies);
    setIsLoading(false);
  };

  const addReply = async () => {
    setIsLoading(true);
    await thread.methods
      .addReply(currentMessage)
      .send({ from: accountAddy })
      .on('receipt', function(receipt) {
        console.log('receipt');
        alert('Reply added!');
      });

    setCurrentMessage('');
    getSetReplies();
    setIsLoading(false);
  };

  return (
    <div>
      <Navbar account={accountAddy} replyCount={replyCount} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex">
            {isLoading ? (
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
            ) : (
              <div>
                <div>
                  <input onChange={e => setCurrentMessage(e.target.value)} />
                  <button onClick={() => addReply(currentMessage)}>
                    Submit
                  </button>
                </div>

                <div>
                  {replies.map(({ poster, content }, i) => (
                    <div>
                      <p>{poster}</p>
                      <p>{content}</p>
                    </div>
                  ))}
                </div>
              </div>

              // <Main createProduct={this.createProduct} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
