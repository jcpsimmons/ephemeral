import React, { Component } from "react";
import Web3 from "web3";
import logo from "../logo.png";
import "./App.css";
import Thread from "../abis/Thread.json";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Thread.networks[networkId];
    if (networkData) {
      const thread = web3.eth.Contract(
        Thread.abi,
        networkData.address
      );
      const replyCount = await thread.methods.replyCount().call()

      console.log('replyCount.toNumber() :>> ', replyCount.toNumber());
      this.setState({ loading: false, replyCount, thread }, () => { this.getSetReplies() });
    } else {
      window.alert("Thread contract not deployed to detected network.");
    }
  }

  async getSetReplies() {
    const replies = []
    for (let i = 0; i < this.state.replyCount; i++) {
      const reply = await this.state.thread.methods.replies(i).call()

      console.log('reply :>> ', reply);
      replies.push(reply)
    }

    this.setState({ replies })
  }

  constructor(props) {
    super(props);
    this.state = {
      thread: null,
      account: "",
      replyCount: 0,
      replies: [],
      loading: true,
      message: "",
    };

    this.addReply = this.addReply.bind(this);
    this.getSetReplies = this.getSetReplies.bind(this)
  }

  addReply(replyContent) {
    this.setState({ loading: true });
    this.state.thread.methods
      .addReply(replyContent)
      .send({ from: this.state.account })
      .once("receipt", (_receipt) => {
        this.setState({ loading: false });
      });

  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (

                <div>
                  <div>
                    <h1>stuff</h1>
                    <input onChange={(e) => this.setState({ message: e.target.value })} /><button onClick={() => this.addReply(this.state.message)}>Submit</button>
                  </div>

                  <div>
                    {this.state.replies.map(({ poster, content }, i) => (
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
}

export default App;
