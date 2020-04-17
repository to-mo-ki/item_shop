const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
const { BN, balance, constants, ether, expectRevert, expectEvent, send, time } = require('@openzeppelin/test-helpers');
const { expect, assert } = require('chai');
require('chai').should();

var ItemShop = contract.fromArtifact("ItemShop");
var ItemToken = contract.fromArtifact("ItemToken");
const [deployer, other] = accounts;

describe('ItemShop', function () {
  this.timeout(10000);
  var obj;
  describe('getState method', function () {
    beforeEach(async function () {
      var itemToken = await ItemToken.new();
      obj = await ItemShop.new(itemToken.address, 15);
      itemToken.transferOwnership(obj.address);
    });

    it("No item test", async function () {
      count = await obj.getItemCount();
      assert.equal(count, 0);
      expectRevert(obj.buy(0, { value: 1 }), 'Invalid item id');
      expectRevert(obj.getItem(0), 'Invalid item id');
    });

    it("unsold test", async function () {
      await obj.mintItem(2);
      item = await obj.getItem(0);
      assert.equal(item[0], 2);
      assert.equal(item[1], false);
    });
  });

  describe('exhibit', function () {
    beforeEach(async function () {
      var itemToken = await ItemToken.new();
      instance = await ItemShop.new(itemToken.address, 15);
      itemToken.transferOwnership(instance.address);
    });

    it("exhibit normally", async function () {
      await instance.mintItem(2);
      await instance.exhibit(0, 22, 11, 33);
    });

    it("reverts when nonexist item", async function () {
      expectRevert(instance.exhibit(0, 22, 11, 33), "ItemShop: nonexist item id");
    });

    it("reverts when exihibit caller is not owner", async function () {
      await instance.mintItem(2);
      expectRevert(instance.exhibit(0, 22, 11, 33, { from: accounts[0] }), "ItemShop: exihibit caller is not owner");
    });

    it("reverts when zero start price", async function () {
      await instance.mintItem(2);
      expectRevert(instance.exhibit(0, 0, 11, 33), "ItemShop: zero price");
      expectRevert(instance.exhibit(0, 11, 0, 33), "ItemShop: zero price");
    });

    it("reverts when start price is lower than end price", async function () {
      await instance.mintItem(2);
      expectRevert(instance.exhibit(0, 11, 22, 33), "ItemShop: start price is lower than end price");
    });

    it("reverts when zero duration", async function () {
      await instance.mintItem(2);
      expectRevert(instance.exhibit(0, 22, 11, 0), "ItemShop: zero duration");
    });

  });

  describe('getAuction', function () {
    beforeEach(async function () {
      itemToken = await ItemToken.new();
      instance = await ItemShop.new(itemToken.address, 15);
      itemToken.transferOwnership(instance.address);
    });

    it("get exist auction", async function () {
      var test = await instance.mintItem(2);
      await instance.exhibit(0, 22, 11, 33);
      var auction = await instance.getAuction(0);
      expect(auction[0]).to.be.bignumber.that.equals('0');
      expect(auction[1]).to.be.bignumber.that.equals('22');
      expect(auction[2]).to.be.bignumber.that.equals('11');
      expect(auction[3]).to.be.bignumber.that.equals('33');
      expect(auction[4]).to.be.equals(await instance.owner());
      expect(auction[5].toString()).to.be.equals((await time.latestBlock()).toString());
    });

    it("reverts when get nonexist auction", async function () {
      expectRevert(instance.getAuction(0), "ItemShop: nonexist auction id")
    })
  });

});