import {createProject} from '../src/api/web3Api';

contract('Project', function(accounts) {
    
    it("should start with owner, fundingGoal, and deadline", function() {
        var fundingGoal = 10000000000000000000; // 10 Eth in wei
        var title = "First Project";
        var endTime = 1000; // block number

        Project.new(fundingGoal, endTime, title, { from: accounts[0] })
            .then(function (project) {
                return project.owner.call()
                    .then(function (owner) {
                        assert.equal(owner, accounts[0], "owner should match account[0]");
                        return project.fundingGoal.call();
                    })
                    .then(function (projectGoal) {
                        assert.equal(projectGoal, fundingGoal, "funding goal should match supplied goal");
                        return project.deadline.call();
                    })
                    .then(function (deadline) {
                        assert.equal(deadline, endTime, "deadline should match supplied endTime");
                        return project.title();
                    })
                    .then(function (projectTitle) {
                        assert.equal(projectTitle, title, "title should match supplied title");
                        return project.totalFunding.call();
                    })
                    .then(function (totalFunding) {
                        assert.equal(totalFunding.valueOf(), 0, "there shouldn't be any funding for new project");
                        return project.numOfContributions.call();
                    })
                    .then(function(num) {
                        assert.equal(num.valueOf(), 0, "there shouldn't be any contributions for new project");
                    });
            });
    });
});