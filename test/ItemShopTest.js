const delay = time => new Promise(res => setTimeout(() => res(), time))

var ItemShop = artifacts.require("ItemShop");

async function checkExeption(promise, message) {
  await promise.then((result) => {
    assert(false);
  }).catch((err) => {
    assert(err.toString().includes(message));
  });
}

contract('ItemShop', function (accounts) {

  describe('getState method', function () {
    beforeEach(async function () {
      obj = await ItemShop.new();
    });

    it("No item test", async function () {
      count = await obj.getItemCount();
      assert.equal(count, 0);
      //checkExeption(obj.buy(0, { value: 1 }), 'Invalid item id');
      //checkExeption(obj.get(0), 'Invalid item id');
    });

    it("unsold test", async function () {
      await obj.mintItem(2);
      item = await obj.getItem(0);
      assert.equal(item[0], 2);
      assert.equal(item[1], false);
    });

    it("buy test", async function () {
      await obj.mintItem(2);
      await obj.buy(0, { value: 2 });
      item = await obj.getItem(0);
      assert.equal(item[0], 2);
      assert.equal(item[1], true);
    });

    it("invalid money", async function () {
      await obj.mintItem(2);
      checkExeption(obj.buy(0, { value: 1 }), 'Invalid money');
      item = await obj.getItem(0);
      assert.equal(item[0], 2);
      assert.equal(item[1], false);
    });

    it("sold item", async function () {
      await obj.mintItem(2);
      obj.buy(0, { value: 2 });
      checkExeption(obj.buy(0, { value: 1 }), 'sold out');
    });
  });
});