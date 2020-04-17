var ItemShop = artifacts.require("ItemShop");
var ItemToken = artifacts.require("ItemToken");

module.exports = async (deployer, network) => {
  if (network == "development") {
    secondsPerBlock = 1;
  } else if (network == "rinkeby") {
    secondsPerBlock = 15;
  } else {
    secondsPerBlock = 1;
  }
  await deployer.deploy(ItemToken);
  await deployer.deploy(ItemShop, ItemToken.address, secondsPerBlock);
  itemTokenInstance = await ItemToken.deployed();
  itemTokenInstance.transferOwnership(ItemShop.address);
};