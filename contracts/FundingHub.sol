pragma solidity ^0.4.4;
import "Project.sol";

contract FundingHub {

    address public owner;
    uint public numOfProjects;

    mapping (uint => address) public projects;

    event LogProjectCreated(uint id, string title, address addr, address creator);
    event LogContributionSent(address projectAddress, address contributor, uint amount);

    event LogFailure(string message);

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

        if (_fundingGoal <= 0) {
            LogFailure("Project funding goal must be greater than 0");
            throw;
        }

        if (block.number >= _deadline) {
            LogFailure("Project deadline must be greater than the current block");
            throw;
        }

        Project p = new Project(_fundingGoal, _deadline, _title, msg.sender);
        projects[numOfProjects] = p;
        LogProjectCreated(numOfProjects, _title, p, msg.sender);
        numOfProjects++;
        return p;
    }

    /**
    * Allow senders to contribute to a Project by it's address. Calls the fund() function in the Project 
    * contract and passes on all value attached to this function call
    * [0] -> contribution was sent 
    */
    function contribute(address _projectAddress) payable returns (bool successful) { 

        // Check amount sent is greater than 0
        if (msg.value <= 0) {
            LogFailure("Contributions must be greater than 0 wei");
            throw;
        }

        Project deployedProject = Project(_projectAddress);

        // Check that there is actually a Project contract at that address
        if (deployedProject.fundingHub() == address(0)) {
            LogFailure("Project contract not found at address");
            throw;
        }

        // Check that fund call was successful
        if (deployedProject.fund.value(msg.value)(msg.sender)) {
            LogContributionSent(_projectAddress, msg.sender, msg.value);
            return true;
        } else {
            LogFailure("Contribution did not send successfully");
            return false;
        }
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