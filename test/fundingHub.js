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

contract('MarketManager', function(accounts) {
    
    it("should start with an empty project list", function() {
        var fundingHub = FundingHub.deployed();

        return fundingHub.numOfProjects.call()
            .then(function(count) {
                assert.equal(count.valueOf(), 0, "should start with no projects");
            });
    });

    var projectContractAddress;

    it("should be possible to create a project", function() {
        var fundingHub = FundingHub.deployed();

        var fundingGoal = 10000000000000000000; // wei
        var title = "First Project";
        var endTime = 1000; // block number

        var blockNumber = web3.eth.blockNumber + 1;

        return fundingHub.createProject(fundingGoal, endTime, title, { from: accounts[0], value: 1000000000000000000 })
            .then(function(tx) {
                return Promise.all([
                    getEventsPromise(fundingHub.LogProjectCreated({}, { fromBlock: blockNumber, toBlock: "latest"})), // wait for the expected event (filter out other events)
                    web3.eth.getTransactionReceiptMined(tx), // wait for the transaction to be mined
                ]);    
            })
            .then(function (eventAndReceipt) {
                // var event = eventAndReceipt[0]
                // var receipt = eventAndReceipt[1]
                var eventArgs = eventAndReceipt[0][0].args;
                assert.equal(eventArgs.id.valueOf(), 0, "should be the first project's id");
                assert.equal(eventArgs.title, title, "should be the first project's title");

                projectContractAddress = eventArgs.addr;

                return fundingHub.numOfProjects.call();
            })
            .then(function(count) {
                assert.equal(count.valueOf(), 1, "should have added a project");

                return fundingHub.projects.call(0); // Retrieve Project with id 0
            })
            .then(function(address) {
                assert.equal(projectContractAddress, address, "deployed address should match mapped address at id 0");
            });
    });
});