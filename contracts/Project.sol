pragma solidity ^0.4.4;

contract Project {
    
    address public owner;

    uint public fundingGoal;
    uint public deadline;
    string public title;

    struct Contribution {
        address contributor;
        uint amount;
    }

    // TODO Should we keep track of number of contributions?
    mapping (address => Contribution) public contributions;

    uint public totalFunding;
    uint public numOfContributions;

    event LogContributionReceived(address projectAddress, address contributor, uint amount);
    event LogPayoutInitiated(address projectAddress, address owner, uint totalPayout);
    event LogRefundIssued(address projectAddress, address contributor, uint refundAmount);
    event LogFundingGoalReached(address projectAddress, uint totalFunding, uint totalContributions);
    event LogFundingFailed(address projectAddress, uint totalFunding, uint totalContributions);

    modifier onlyOwner {
        if (owner != msg.sender) throw;
        _;
    }

    modifier onlyFailedProject {
        // Deadline should be over
        if (block.number < deadline) {
            throw;
        }

        // Funding goal should not have been reached
        if (totalFunding >= fundingGoal) {
            throw;
        }
        _;
    }

    function Project(uint _fundingGoal, uint _deadline, string _title) {
        owner = msg.sender;
        fundingGoal = _fundingGoal;
        deadline = _deadline;
        title = _title;

        totalFunding = 0;
        numOfContributions = 0; // TODO if contributions are mapped, what value does this provide?
    }

    /**
    * Receives contributions from a FundingHub Contract. Stores contribution information in contributions map.
    * Returns contributions to inactive Projects to their original sender.
    * Calls Refund or Payout if criteria is reached upon transaction.
    * (Optionally could only allow contributions from the creating FundingHub).
    */
    function fund(uint _amount, address _contributor) payable returns (bool successful) {
        // if funding reached, refund sender
        if (totalFunding >= fundingGoal) {
            refund()
            return false;
        }

        // if deadline reached, refund sender
        if (block.number > deadline) {
            refund();
            return false;
        }

        Contribution c = contributions[_contributor]; // Should contributions be mapped by address or index 
        c.contributor = _contributor;
        c.amount += _amount; // It's possible that a user contributes more than once

        totalFunding += _amount;
        numOfContributions++;

        LogContributionReceived(this, _contributor, _amount);

        // check success criteria
        if (totalFunding >= fundingGoal) {
            payout();
        }

        return true;
    }

    /**
    * If funding goal has been met, transfer fund to project owner
    */
    function payout() payable returns (bool successful) {
        if (totalFunding < fundingGoal) {
            throw;
        }

        uint amount = totalFunding;

        // prevent re-entrancy
        totalFunding = 0;

        if (owner.send(amount)) {
            return true;
        } else {
            totalFunding = amount;
            return false;
        }

        return true;
    }

    /**
    * If the deadline is passed and the goal was not reached, allow contributors to withdraw their contributions
    */
    function refund() payable onlyFailedProject returns (bool successful) {
        Contribution c = contributions[msg.sender];
        uint amount = c.amount;

        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attack
        c.amount = 0;

        if (msg.sender.send(amount)) {
            return true;
        } else {
            c.amount = amount;
            return false;
        }
        return true;
    }

    function kill() public onlyOwner {
        selfdestruct(owner);
    }

    /** 
    * Don't allow Ether to be sent blindly to this contract
    */
    function() {
        throw;
    }
}