// Found here https://gist.github.com/xavierlepretre/88682e871f4ad07be4534ae560692ee6
web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
    var transactionReceiptAsync;
    interval = interval ? interval : 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
        try {
            var receipt = web3.eth.getTransactionReceipt(txnHash);
            if (receipt == null) {
                setTimeout(function () {
                    transactionReceiptAsync(txnHash, resolve, reject);
                }, interval);
            } else {
                resolve(receipt);
            }
        } catch(e) {
            reject(e);
        }
    };

    return new Promise(function (resolve, reject) {
        transactionReceiptAsync(txnHash, resolve, reject);
    });
};

// Found here https://gist.github.com/xavierlepretre/afab5a6ca65e0c52eaf902b50b807401
var getEventsPromise = function (myFilter, count) {
    return new Promise(function (resolve, reject) {
        count = count ? count : 1;
        var results = [];
        myFilter.watch(function (error, result) {
            if (error) {
                reject(error);
            } else {
                count--;
                results.push(result);
            }
            if (count <= 0) {
                resolve(results);
                myFilter.stopWatching();
            }
        });
    });
};

contract('FundingHub', function(accounts) {
    
    it("should be possible to create, contribute, and refund a project", function() {
        var fundingHub = FundingHub.deployed();

        var startingBlock = web3.eth.blockNumber;

        var fundingGoal = 10000000000000000000; // 10 Eth in wei
        var title = "First Project";
        var endTime = startingBlock + 2 ; // block number

        var contributor = accounts[1];
        var contributorStartBalance = web3.eth.getBalance(accounts[1]);
        var contributionAmount = web3.toWei(1, "ether"); //1000000000000000000 // 1 Eth in wei

        var blockNumber = web3.eth.blockNumber + 1;
        
        var deployedProject;

        // 1. Create a Project
        return fundingHub.createProject(fundingGoal, endTime, title, { from: accounts[0] })  // send transaction
            .then(function(tx) {
                return Promise.all([
                    web3.eth.getTransactionReceiptMined(tx)
                ]);
            })
            .then(function(receipt) {
                return fundingHub.projects.call(0);
            })
            .then(function(contractAddr) {
                // 2. Contribute to Project
                return fundingHub.contribute(contractAddr, { from: contributor, value: contributionAmount, gas: 3000000})
                    .then(function(tx) {
                        return Promise.all([
                            getEventsPromise(fundingHub.LogContributionSent({}, { fromBlock: blockNumber, toBlock: "latest" })), // wait for expected event (filter out other events)
                            web3.eth.getTransactionReceiptMined(tx), // wait for the transaction to be mined
                        ]);
                    })
                    .then(function (eventAndReceipt) {
                        var eventArgs = eventAndReceipt[0][0].args;
                        assert.equal(eventArgs.projectAddress, contractAddr, "event project address should match deployed project address");
                        assert.equal(eventArgs.contributor, contributor, "event contributor should match account address");
                        assert.equal(eventArgs.amount.valueOf(), contributionAmount, "event amount should match contribution amount");

                        deployedProject = Project.at(contractAddr);
                        return deployedProject.totalFunding.call();
                    })
                    .then(function (amount) {
                        // 3. Verify contribution
                        assert.equal(amount.valueOf(), contributionAmount, "Project total funding should match only contribution");
                        // 4. Request refund from expired Project
                        assert.equal(endTime, web3.eth.blockNumber, "Should have expired at this point");
                        return deployedProject.refund({from: contributor});
                    })
                    .then(function(refundTx) {
                        return Promise.all([
                            getEventsPromise(deployedProject.LogRefundIssued({},{})),
                            web3.eth.getTransactionReceiptMined(refundTx)
                        ]);
                    })
                    .then(function(eventAndReceipt) {
                        var eventArgs = eventAndReceipt[0][0].args;
                        // 5. Verify refund amount matched original contribution
                        assert.equal(eventArgs.refundAmount.valueOf(), contributionAmount, "Refund amount should match original contribution");
                    });
            });
    });
});