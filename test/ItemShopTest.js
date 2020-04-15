const delay = time => new Promise(res => setTimeout(() => res(), time))
const { balance, constants, ether, expectRevert, send } = require('@openzeppelin/test-helpers');
var ItemShop = artifacts.require("ItemShop");
var ItemToken = artifacts.require("ItemToken");

async function checkExeption(promise, message) {
  await promise.then((result) => {
    assert.fail();
  }).catch((err) => {
    assert.isTrue(err.toString().includes(message), "error-log" + err);
  });
}

contract('ItemShop', function (accounts) {
  var obj;
  describe('getState method', function () {
    beforeEach(async function () {
      var itemToken = await ItemToken.new();
      obj = await ItemShop.new(itemToken.address);
      itemToken.transferOwnership(obj.address);
    });

    it("No item test", async function () {
      count = await obj.getItemCount();
      assert.equal(count, 0);
      checkExeption(obj.buy(0, { value: 1 }), 'Invalid item id');
      checkExeption(obj.getItem(0), 'Invalid item id');
    });

    it("buy test by other account", async function () {
      await obj.mintItem(2);
      await obj.buy(0, { value: web3.utils.toWei("2", "ether"), from: accounts[1] });
      item = await obj.getItem(0);
      assert.equal(item[0], 2);
      assert.equal(item[1], true);
    });

    it("unsold test", async function () {
      await obj.mintItem(2);
      item = await obj.getItem(0);
      assert.equal(item[0], 2);
      assert.equal(item[1], false);
    });

    it("invalid price", async function () {
      await obj.mintItem(2);
      checkExeption(obj.buy(0, { value: 1 }), 'Invalid price');
      item = await obj.getItem(0);
      assert.equal(item[0], 2);
      assert.equal(item[1], false);
    });

    it("sold item", async function () {
      await obj.mintItem(2);
      await obj.buy(0, { value: web3.utils.toWei("2", "ether") });
      checkExeption(obj.buy(0, { value: web3.utils.toWei("2", "ether") }), 'sold out');
    });

    it("withdrawPayments", async function () {
      await obj.mintItem(2);
      await obj.buy(0, { value: web3.utils.toWei("2", "ether") });
      var wei1 = await web3.eth.getBalance(accounts[0]);
      var ether1 = web3.utils.fromWei(wei1, 'ether')
      await obj.withdrawPayments();
      var wei2 = await web3.eth.getBalance(accounts[0]);
      var ether2 = web3.utils.fromWei(wei2, 'ether')
      expect(ether2 - ether1).to.most(0.0001);
    });
  });
});