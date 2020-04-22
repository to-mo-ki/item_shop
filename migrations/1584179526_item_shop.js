var ItemShop = artifacts.require("ItemShop");
var ItemToken = artifacts.require("ItemToken");

module.exports = async (deployer, network) => {
  if (network == "development") {
    secondsPerBlock = 1;
    baseURI = "http://localhost:8080/ipfs/";
  } else if (network == "rinkeby") {
    secondsPerBlock = 15;
    baseURI = "https://ipfs.infura.io/ipfs/";
  } else {
    secondsPerBlock = 1;
    baseURI = "http://localhost:8080/ipfs/";
  }
  await deployer.deploy(ItemShop, "ItemToken", "IS", baseURI, secondsPerBlock);
};