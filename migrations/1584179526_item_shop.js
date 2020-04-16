var ItemShop = artifacts.require("ItemShop");
var ItemToken = artifacts.require("ItemToken");

module.exports = async (deployer) => {
  await deployer.deploy(ItemToken);
  await deployer.deploy(ItemShop, ItemToken.address, 15);
  itemTokenInstance = await ItemToken.deployed();
  itemTokenInstance.transferOwnership(ItemShop.address);
};