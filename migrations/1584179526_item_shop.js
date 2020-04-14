var ItemShop = artifacts.require("ItemShop");
var ItemToken = artifacts.require("ItemToken");

module.exports = function (deployer) {
  deployer.deploy(ItemToken).then(() => {
    deployer.deploy(ItemShop, ItemToken);
  });
};