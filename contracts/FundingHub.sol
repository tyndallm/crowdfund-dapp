pragma solidity ^0.4.4

contract FundingHub {
    
    function FundingHub() {

    }

    function createProject() payable returns (bool successful) {
        return true;
    }

    function contribute() payable returns (bool successful) {
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