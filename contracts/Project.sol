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

    mapping (address => Contribution) public contributions;

    function Project(uint _fundingGoal, uint _deadline, string _title) {
        owner = msg.sender;
        fundingGoal = _fundingGoal;
        deadline = _deadline;
        title = _title;
    }

    /**
    * Receives contributions from a FundingHub Contract. Stores contribution information in contributions map.
    * Returns contributions to inactive Projects to their original sender.
    * Calls Refund or Payout if criteria is reached upon transaction.
    * (Optionally could only allow contributions from the creating FundingHub).
    */
    function fund(uint _amount, address _sender) payable returns (bool successful) {
        Contribution c = contributions[sender];
        c.address = _sender;
        c.amount = _amount;
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