import Web3 from 'web3';

import truffleConfig from '../../truffle.js';
import {getExtendedWeb3Provider} from '../utils/Utils.js';

let web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
let web3Provided;


function initializeWeb3() {
    if (typeof web3 !== 'undefined') {
        web3Provided = new Web3(web3.currentProvider);
    } else {
        web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location));
    }

    return web3Provided;
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
            resolve(value.valueOf())
        });
    });
}