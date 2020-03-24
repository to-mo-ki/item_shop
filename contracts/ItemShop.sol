pragma solidity ^0.6.0;

import "../openzeppelin-contracts/contracts/access/Ownable.sol";
import "../openzeppelin-contracts/contracts/token/ERC721/ERC721Full.sol";
import "../openzeppelin-contracts/contracts/payment/PullPayment.sol";

contract ItemShop is Ownable, ERC721Full, PullPayment {
    struct Item {
        uint256 price;
        bool sold;
    }

    Item[] public items;
    //一時的
    constructor() public ERC721Full("ItemShop", "IS") {}

    modifier validItemId(uint256 itemId) {
        require(itemId < items.length && itemId >= 0, "Invalid item id");
        _;
    }

    modifier unsold(uint256 _id) {
        require(!items[_id].sold, "sold out");
        _;
    }

    function setPrice(uint256 _id, uint256 _price)
        public
        onlyOwner
        validItemId(_id)
        unsold(_id)
    {
        items[_id].price = _price;
    }

    function mintItem(uint256 _price) public onlyOwner {
        items.push(Item(_price, false));
        uint256 newTokenId = items.length - 1;
        _mint(msg.sender, newTokenId);
    }

    function buy(uint256 _id) public payable validItemId(_id) unsold(_id) {
        require(msg.value == items[_id].price, "Invalid price");
        //require(owner() != address(0), "Invalid Owner");
        //_asyncTransfer(owner, items[_id].price);
        safeTransferFrom(owner(), msg.sender, _id);
        items[_id].sold = true;
    }

    function getItem(uint256 _id)
        public
        view
        validItemId(_id)
        returns (uint256, bool, address)
    {
        return (items[_id].price, items[_id].sold, super.ownerOf(_id));
    }

    function getItemCount() public view returns (uint256) {
        return items.length;
    }

}
