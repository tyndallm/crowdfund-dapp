pragma solidity ^0.4.4;

contract Project {

    struct Properties {
        uint goal;
        uint deadline;
        string title;
        address creator;
    }

    address public fundingHub;

    mapping (address => uint) public pendingFunding;

    uint public totalFunding;
    uint public contributionsCount;
    uint public contributorsCount;

    Properties public properties;

    event LogContributionReceived(address projectAddress, address contributor, uint amount);
    event LogPayoutInitiated(address projectAddress, address owner, uint totalPayout);
    event LogRefundIssued(address projectAddress, address contributor, uint refundAmount);
    event LogFundingGoalReached(address projectAddress, uint totalFunding, uint totalContributions);
    event LogFundingFailed(address projectAddress, uint totalFunding, uint totalContributions);

    modifier onlyFundingHub {
        if (fundingHub != msg.sender) throw;
        _;
    }

    modifier onlyFailedProject {
        // Deadline should be over
        if (block.number < properties.deadline) {
            throw;
        }

        // Funding goal should not have been reached
        if (totalFunding >= properties.goal) {
            throw;
        }
        _;
    }

    modifier onlyFunded {
        if (totalFunding < properties.goal) {
            throw;
        }
        _;
    }

    function Project(uint _fundingGoal, uint _deadline, string _title, address _creator) {
        // validate parameters
        if (_fundingGoal <= 0) throw;
        if (block.number >= _deadline) throw;
        if (_creator == 0) throw;

        fundingHub = msg.sender;

        properties = Properties({
            goal: _fundingGoal,
            deadline: _deadline,
            title: _title,
            creator: _creator
        });

        totalFunding = 0;
        contributionsCount = 0;
        contributorsCount = 0;
    }

    /**
    * Project values are indexed in return value:
    * [0] -> Project.properties.title
    * [1] -> Project.properties.goal
    * [2] -> Project.properties.deadline
    * [3] -> Project.properties.creator
    * [4] -> Project.totalFunding
    * [5] -> Project.contributionsCount
    * [6] -> Project.contributorsCount
    * [7] -> Project.fundingHub
    * [8] -> Project (address)
    */
    function getProject() returns (string, uint, uint, address, uint, uint, uint, address, address) {
        return (properties.title,
                properties.goal,
                properties.deadline,
                properties.creator,
                totalFunding,
                contributionsCount,
                contributorsCount,
                fundingHub,
                address(this));
    }

    /**
    * This is the function called when the FundingHub receives a contribution. 
    * The function must keep track of the contributor and the individual amount contributed. 
    * If the contribution was sent after the deadline of the project passed, 
    * or the full amount has been reached, the function must return the value 
    * to the originator of the transaction and call one of two functions. 
    * If the full funding amount has been reached, the function must call payout. 
    * If the deadline has passed without the funding goal being reached, the function must call refund.
    */
    function fund(uint _amount, address _contributor) payable returns (bool successful) {
        if (_amount <= 0) throw;
        if (msg.sender != fundingHub) throw; // Force all contributions to be made through fundingHub
        if (block.number >= properties.deadline) {
            // refund
        }
        if (totalFunding >= properties.goal) {
            // payout
            // refund
        }

        uint prevContribution = pendingFunding[_contributor];

        pendingFunding[_contributor] += _amount;
        totalFunding += _amount;
        contributionsCount++;

        if (prevContribution == 0) {
            contributorsCount++;
        }

        LogContributionReceived(this, _contributor, _amount);

        return true;
    }

    /**
    * If funding goal has been met, transfer fund to project creator
    */
    function payout() payable onlyFunded returns (bool successful) {
        if (totalFunding < properties.goal) {
            throw;
        }

        uint amount = totalFunding;

        // prevent re-entrancy
        totalFunding = 0;

        if (properties.creator.send(amount)) {
            return true;
        } else {
            totalFunding = amount;
            return false;
        }

        return true;
    }

    /**
    * If the deadline is passed and the goal was not reached, allow contributors to withdraw their contributions
    * TODO:potential problem! do we want others to be able to refund you on your behalf (Right now anyone could call this function with your address) 
    */
    function refund(address _refundAddress) payable onlyFailedProject returns (bool successful) {
        // Don't allow anyone besides this contract to call refund with your address
        if (msg.sender != address(this)) {
            if (msg.sender != _refundAddress) {
                throw;
            }
        }

        //Contributor c = contributors[_refundAddress];
        
        // prevent re-entrancy attack
        // uint amount = c.amount;
        // c.amount = 0;

        // if (_refundAddress.send(amount)) {
        //     return true;
        // } else {
        //     c.amount = amount;
        //     return false;
        // }
        return true;
    }

    function getCreator() returns (address creator){
        return properties.creator;
    }

    function kill() public onlyFundingHub {
        selfdestruct(fundingHub);
    }

    /** 
    * Don't allow Ether to be sent blindly to this contract
    */
    function() {
        throw;
    }
}