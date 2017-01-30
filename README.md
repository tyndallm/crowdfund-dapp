## Decentralized Crowdfunding App

This is a simple crowdfunding dapp intended to show off what I've learned from the B9 Lab Ethereum course. The contracts are written in Solidity and the app is utilizing the Truffle framework. The frontend of the app is built with React and Webpack. 

### Contracts



### App


### Screenshots
![Funding Hub screen](https://github.com/tyndallm/crowdfund-dapp/blob/master/docs/images/hub_screen.png?raw=true)
![Create project screen](https://github.com/tyndallm/crowdfund-dapp/blob/master/docs/images/create_project.png?raw=true)
![Project screen](https://github.com/tyndallm/crowdfund-dapp/blob/master/docs/images/project_screen.png?raw=true)


### Running

The Web3 RPC location will be picked up from the `truffle.js` file.

0. Clone this repo
0. `npm install`
0. Make sure `testrpc` is running on its default port. Then:
  - `npm run start` - Starts the development server
  - `npm run build` - Generates a build
  - `truffle test` - Run the rest suite
