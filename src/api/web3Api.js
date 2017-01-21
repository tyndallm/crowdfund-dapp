import Web3 from 'web3';

import truffleConfig from '../../truffle.js';
import {getExtendedWeb3Provider} from '../utils/Utils.js';
import FundingHub from 'contracts/FundingHub.sol';
import Project from 'contracts/Project.sol';

let web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
let web3Provided;

// TODO: Figure out a better way to set providers for contracts
FundingHub.setProvider(new Web3.providers.HttpProvider(web3Location));
Project.setProvider(new Web3.providers.HttpProvider(web3Location));

function initializeWeb3() {
    if (typeof web3 !== 'undefined') {
        web3Provided = new Web3(web3.currentProvider);
    } else {
        web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location));
    }    

    return getExtendedWeb3Provider(web3Provided);
}

function web3Client() {
    if (web3Provided) {
        return web3Provided;
    } else {
        return initializeWeb3();
    }
}

export function getAccounts() {
    return new Promise((resolve, reject) => {
        web3Client().eth.getAccounts(function (err, accts) {
            if (err != null) {
                console.log("Web3Api Error: ", err);
                reject();
            }

            if (accts.length === 0) {
                console.log("Web3Api Error: couldn't get any accounts");
                reject();
            }

            let accountsAndBalances = accts.map((address => {
                return getAccountBalance(address).then((balance) => { return { address, balance} });
            }));

            Promise.all(accountsAndBalances).then((accountsAndBalances) => {
                resolve(accountsAndBalances);
            });

        });
    
    });
}

function getAccountBalance(account) {
    return new Promise((resolve, reject) => {
        web3Client().eth.getBalance(account, function(err, value) {
            resolve(value.valueOf());
        });
    });
}

export function getProjects() {
    return new Promise((resolve, reject) => {
        let fundingHub = FundingHub.deployed();
        fundingHub.numOfProjects.call().then(function(num) {
            let projectCount = num.valueOf();

            let array = Array.apply(null, {length: projectCount}).map(Number.call, Number);
            let projectPromises = array.map((id => {
                return getProjectAddress(id);
            }));

            Promise.all(projectPromises).then((projects) => {
                resolve(projects: projects);
            });
        });
    });
}

function getProjectAddress(id) {
    return new Promise((resolve, reject) => {
        let fundingHub = FundingHub.deployed();
        fundingHub.projects.call(id).then(function(address) {
            resolve({address: address});
        });
    });
}

export function createProject(creator) {
    return new Promise((resolve, reject) => {
        let title = "First funding project";
        let goal = 10000000000000000000;
        let deadline = web3Client().eth.blockNumber + 100;

        let fundingHub = FundingHub.deployed();
        fundingHub.createProject(goal, deadline, title, { from: creator, gas: 3000000 })
            .then(function(tx) {
                console.log("project tx: ", tx);
                return Promise.all([
                    web3Client().eth.getTransactionReceiptMined(tx)
                ]);
            })
            .then(function(receipt) {
                console.log("[web3Api.fundingHub.createProject] transaction mined: ", receipt);
                resolve(receipt);
            });
    })
}










