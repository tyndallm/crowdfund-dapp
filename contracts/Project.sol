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

    function Project(uint _fundingGoal, uint _deadline, string _title) {
        owner = msg.sender;
        fundingGoal = _fundingGoal;
        deadline = _deadline;
        title = _title;

        totalFunding = 0;
        numOfContributions = 0;
    }

    /**
    * Receives contributions from a FundingHub Contract. Stores contribution information in contributions map.
    * Returns contributions to inactive Projects to their original sender.
    * Calls Refund or Payout if criteria is reached upon transaction.
    * (Optionally could only allow contributions from the creating FundingHub).
    */
    function fund(uint _amount, address _contributor) payable returns (bool successful) {
        Contribution c = contributions[_contributor]; // Should contributions be mapped by address or index 
        c.contributor = _contributor;
        c.amount = _amount;

        totalFunding += _amount;
        numOfContributions++;

        return true;
    }

    function payout() payable returns (bool successful) {
        return true;
    }

    function refund() payable returns (bool successful) {
        return true;
    }

    /** 
    * Don't allow Ether to be sent blindly to this contract
    */
    function() {
        throw;
    }
}