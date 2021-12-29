```
$$$$$$$$\           $$\                                                             $$\
$$  _____|          $$ |                                                            $$ |
$$ |       $$$$$$\  $$$$$$$\   $$$$$$\  $$$$$$\$$$$\   $$$$$$\   $$$$$$\   $$$$$$\  $$ |
$$$$$\    $$  __$$\ $$  __$$\ $$  __$$\ $$  _$$  _$$\ $$  __$$\ $$  __$$\  \____$$\ $$ |
$$  __|   $$ /  $$ |$$ |  $$ |$$$$$$$$ |$$ / $$ / $$ |$$$$$$$$ |$$ |  \__| $$$$$$$ |$$ |
$$ |      $$ |  $$ |$$ |  $$ |$$   ____|$$ | $$ | $$ |$$   ____|$$ |      $$  __$$ |$$ |
$$$$$$$$\ $$$$$$$  |$$ |  $$ |\$$$$$$$\ $$ | $$ | $$ |\$$$$$$$\ $$ |      \$$$$$$$ |$$ |
\________|$$  ____/ \__|  \__| \_______|\__| \__| \__| \_______|\__|       \_______|\__|
          $$ |
          $$ |
          \__|

$$$$$$$\                                      $$\
$$  __$$\                                     $$ |
$$ |  $$ | $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$$ |
$$$$$$$\ |$$  __$$\  \____$$\ $$  __$$\ $$  __$$ |
$$  __$$\ $$ /  $$ | $$$$$$$ |$$ |  \__|$$ /  $$ |
$$ |  $$ |$$ |  $$ |$$  __$$ |$$ |      $$ |  $$ |
$$$$$$$  |\$$$$$$  |\$$$$$$$ |$$ |      \$$$$$$$ |
\_______/  \______/  \_______|\__|       \_______|
```

### The internet's most anoymous and most expensive conversation.

[VISIT](https://ephemeralboard.com/)

# What is Ephemeral Board?

An anonymous looping message board. Anything can be posted. The board is by design unmoderatable. Users can post a text message up to 999 characters long as a reply in the main thread. After 99 replies, the board is wiped and the 100th reply starts a new iteration. All old replies will still exist in the blockchain as [contract events](https://etherscan.io/address/0xcb48d88b69272323adb6564678d9fd6908dbeae3#events). [Here is the same contract on Kovan that has a bunch of replies](https://kovan.etherscan.io/address/0x48eb092a010cd06d0d9dfd00960cf60724d5a562#events).

It is free to post in the sense that it will only cost the gas necessary to execute the contract. If you wish to pay another user for their reply - there is a built in UI that handles the dollar to ETH conversion with some preset gift amounts. A 5% service fee is deducted from these payments in order to help fund site maintenance and hosting.

# Tech Stack

I used Solidity language to develop the smart contract that powers the application. For local development I used Truffle and Ganache (you can do the same if you want to play with the app locally). I used Remix IDE to deploy the smart contract. I used Kovan test network to further test the application - the contract deployed there is [viewable here](https://kovan.etherscan.io/address/0x48eb092a010cd06d0d9dfd00960cf60724d5a562). In fact - if you want to play around with the app online without spending any real coin - just connect to the Kovan network and you should be good to go.

For the frontend I used React. This is not the cleanest React I've written. I eschewed Typescript so I could build rapidly. Web3.js is used to interact with MetaMask. For styling I wanted a really atomic and postmodern feel so I went with SCSS modules - this way I could make each component look totally unique with very little overlap. If I refactored, I think some more global state management would be good...not happy with how much prop drilling I'm doing.
