const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
var accessToken = process.env.INFURA_ACCESS_TOKEN;
var deployAccount = process.env.INFURA_DEPLOY_ACCOUNT_PRIVATE_KEY;

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          deployAccount,
          "https://rinkeby.infura.io/v3/" + accessToken
        );
      },
      network_id: 4,
      gas: 5000000
    }
  },
  compilers: {
    solc: {
      version: "^0.5.0",    // Fetch exact version from solc-bin (default: truffle's version)
      //docker: true,         // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {           // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "petersburg" // invalid opcodeを防ぐ
        //evmVersion: "byzantium"
      }
    }
  }
};