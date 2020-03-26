pragma solidity ^0.6.0;

import "./ItemToken.sol";

contract ItemShop is ItemToken {
    modifier validItemId(uint256 itemId) {
        require(itemId < items.length && itemId >= 0, "Invalid item id");
        _;
    }

    modifier unsold(uint256 _id) {
        require(!items[_id].sold, "sold out");
        _;
    }

    function buy(uint256 _id) public payable validItemId(_id) unsold(_id) {
        require(msg.value == items[_id].price * 1 ether, "Invalid price");
        items[_id].sold = true;
        safeTransferFrom(owner(), msg.sender, _id);
        _asyncTransfer(owner(), items[_id].price);
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
