module.exports = function(deployer) {
  deployer.deploy(FundingHub);
  deployer.deploy(ConvertLib);
  deployer.autolink();
};
