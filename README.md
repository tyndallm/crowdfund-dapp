## Decentralized Crowdfunding App

This is a simple crowdfunding dapp intended to show off what I've learned from the B9 Lab Ethereum course. The contracts are written in Solidity and the app is utilizing the Truffle framework. The frontend of the app is built with React and Webpack. 

Fire up the app, then try changing the value of the default balance in `contracts/MetaCoin.sol` from `10000` to `50000`and see the contract be recompiled, hot reloaded and the value updated.

Note: Make sure you are running at least `geth 1.4.17-stable-3885907c`, or in some way be running at least `solc ^0.4.0 `

### Coding Style

This repo uses JS Standard.

### Running

The Web3 RPC location will be picked up from the `truffle.js` file.

0. Clone this repo
0. `npm install`
0. Make sure `testrpc` is running on its default port. Then:
  - `npm run start` - Starts the development server
  - `npm run build` - Generates a build
  - `truffle test` - Run the rest suite
