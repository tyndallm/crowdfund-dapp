pragma solidity ^0.4.4;
import "Project.sol";

contract FundingHub {

    address public owner;
    uint public numOfProjects;

    mapping (uint => address) public projects;

    event LogProjectCreated(uint id, string title, address addr);
    event LogContributionSent(address projectAddress, address contributor, uint amount);

    modifier onlyOwner {
        if (owner != msg.sender) throw;
        _;
    }
    
    function FundingHub() {
        owner = msg.sender;
        numOfProjects = 0;
    }

    /**
    * Create a new Project contract
    * [0] -> new Project contract address
    */
    function createProject(uint _fundingGoal, uint _deadline, string _title) payable returns (Project projectAddress) {
        // TODO Check to see if the funding deadline is in the future
        Project p = new Project(_fundingGoal, _deadline, _title);
        projects[numOfProjects] = p;
        LogProjectCreated(numOfProjects, _title, p);
        numOfProjects++;
        return p;
    }

    /**
    * Allow senders to contribute to a Project by it's address. Calls the fund() function in the individual 
    * Project contract and passes on all value attached to this function call
    * [0] -> contribution was sent 
    */
    function contribute(address _projectAddress) payable returns (bool successful) { 
        // If no amount is sent throw
        if (msg.value <= 0) throw;

        Project projectContract = Project(_projectAddress);

        // If contract has not been initialized throw
        if (projectContract.owner() == 0) {
            throw;
        }

        // Send 
        projectContract.fund(msg.value, msg.sender);
        LogContributionSent(_projectAddress, msg.sender, msg.value);
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