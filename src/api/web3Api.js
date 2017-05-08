import Web3 from 'web3';
import {getExtendedWeb3Provider} from '../utils/web3Utils';
import FundingHubContract from '../../build/contracts/FundingHub.json';
import ProjectContract from '../../build/contracts/Project.json';

const contract = require('truffle-contract');

let web3Provided;

const fundingHub = contract(FundingHubContract);
fundingHub.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

const project = contract(ProjectContract);
project.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

/**
 * TODO: Add a check for a local web3, otherwise fallback to an infura instance
 * This also needs to be https
 */
function initializeWeb3() {
    /*eslint-disable */
    if (typeof web3 !== 'undefined') {
        web3Provided = new Web3(web3.currentProvider);
    } else {
        web3Provided = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    /*eslint-enable */

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
                return getAccountBalance(address).then((balance) => { 
                    return { address, balance} 
                });
            }));

            Promise.all(accountsAndBalances).then((accountsAndBalances) => {
                resolve(accountsAndBalances);
            });

        });
    
    });
}

export function getAccountBalance(account) {
    return new Promise((resolve, reject) => {
        web3Client().eth.getBalance(account, function(err, value) {
            resolve(value.valueOf());
        });
    });
}

export function getProjects() {
    return new Promise((resolve, reject) => {
        let fundingHubInstance;
        fundingHub.deployed().then(function(instance) {
            fundingHubInstance = instance;
            return fundingHubInstance.numOfProjects.call();
        }).then(function(result) {

            let projectCount = result.valueOf();

            // create an array where length = projectCount
            let array = Array.apply(null, {length: projectCount}).map(Number.call, Number);

            // fill array with corresponding project contract addresses
            let projectPromises = array.map((id => {
                return getProjectAddress(id);
            }));

            // get projectDetails for each projectAddress promise
            Promise.all(projectPromises).then((projectAddresses) => {
                let projectDetailPromises = projectAddresses.map((address => {
                    return getProjectDetails(address);
                }));

                Promise.all(projectDetailPromises).then((projects) => {
                    resolve(projects);
                });
            });
        });
    });
}

function getProjectAddress(id) {
    return new Promise((resolve, reject) => {
        fundingHub.deployed().then(function(fundingHubInstance) {
            fundingHubInstance.projects.call(id).then(function(address) {
                resolve(address);
            });
        });
    });
}

export function getProjectDetails(address) {
    return new Promise((resolve, reject) => {
        let projectInstance;
        project.at(address).then(function(instance) {
            projectInstance = instance;
            projectInstance.getProject.call().then(function(projectDetails) {
                resolve({
                    title: projectDetails[0],
                    goal: fromWei(projectDetails[1].toNumber()),
                    deadline: projectDetails[2].toNumber(),
                    creator: projectDetails[3],
                    totalFunding: fromWei(projectDetails[4].toNumber()),
                    contributionsCount: projectDetails[5].toNumber(),
                    contributorsCount: projectDetails[6].toNumber(),
                    fundingHub: projectDetails[7],
                    address: projectDetails[8]
                });
            });
        });
    });
}

export function createProject(params, creator) {
    return new Promise((resolve, reject) => {
        let fundingHubInstance;
        fundingHub.deployed().then(function(instance) {
            fundingHubInstance = instance;
            fundingHubInstance.createProject(
                toWei(params.projectGoalInEth),
                params.projectDeadline,
                params.projectName,
                {
                    from: creator,
                    gas: 1000000
                }
            ).then(function(tx) {
                console.log("web3Api.createProject() project tx: ", tx);
                resolve(tx);
            });
        });
    });
}

export function contribute(contractAddr, amount, contributorAddr) {
    console.log("contractAddr: ", contractAddr);
    console.log("amount: ", amount);
    console.log("contributorAddr: ", contributorAddr);
    // let amt = parseInt(amount); // possible bug here?
    let amountInWei = toWei(amount);
    console.log("amountInWei: ", amountInWei);
    return new Promise((resolve, reject) => {
        fundingHub.deployed().then(function(instance) {
            // web3Client().eth.sendTransaction({ to: "0XF9AEEE7969452E1934BCD2067E570D813BDA8D52", value: toWei(amount), from: contributorAddr, gas: 3000000}, function(result) {
            //     console.log(result);
            //     resolve(result);
            // });
            instance.contribute(contractAddr, { value: amountInWei, from: contributorAddr, gas: 3000000})
            .then(function(resultObject) {
                console.log("web3Api.contribute() transaction result object: ", resultObject);
                resolve(resultObject);
            });
        });
    });
}

export function getProjectContributions(address) {
    return new Promise((resolve, reject) => {
        project.at(address).then(function(instance) {
            instance.contributionsCount.call().then(function(num) {
                let contributionCount = num.valueOf();

                let array = Array.apply(null, {length: contributionCount}).map(Number.call, Number);
                let contributionPromises = array.map((id => {
                    return getContribution(address, id);
                }));

                Promise.all(contributionPromises).then((contributions) => {
                    resolve(contributions);
                });
            });
        });
    });
}

function getContribution(projectAddress, id) {
    return new Promise((resolve, reject) => {
        project.at(projectAddress).then(function(instance) {
            instance.getContribution.call(id).then(function(contribution) {
                resolve({
                    amount: fromWei(contribution[0].toNumber()),
                    contributor: contribution[1]
                });
            });
        });
    });
}

export function getAddressBalance(address) {
    return new Promise((resolve, reject) => {
        web3Client().eth.getBalance(address, function(err, value) {
            resolve(fromWei(value.valueOf()));
        });
    });
}

export function getCurrentBlockNumber() {
    return new Promise((resolve, reject) => {
        web3Client().eth.getBlockNumber(function (err, blockNum) {
            if (err) {
                reject();
            }
            resolve(blockNum);
        });
    });
}

export function getNetwork() {
    return new Promise((resolve, reject) => {
        web3Client().version.getNetwork(function (err, network) {
            if (err) {
                reject();
            }
            resolve(network);
        })
    })
}

export function toWei(ethValue) {
    return web3Client().toWei(ethValue, "ether");
}

export function fromWei(weiValue) {
    return web3Client().fromWei(weiValue, "ether");
}