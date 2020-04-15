pragma solidity ^0.5.0;

import "./ItemToken.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";


contract ItemShop is Ownable {
    using Address for address payable;

    ItemToken public itemToken;

    constructor(ItemToken _itemToken) public {
        itemToken = _itemToken;
    }

    function mintItem(uint256 _price) public onlyOwner {
        itemToken.mintItem(_price);
    }

    function buy(uint256 _id) public payable {
        uint256 price;
        (price, ) = itemToken.getItem(_id);
        require(msg.value == price * 1 ether, "Invalid price");
        itemToken.buy(_id);
        itemToken.safeTransferFrom(address(this), msg.sender, _id);
    }

    function withdrawPayments() public onlyOwner {
        msg.sender.sendValue(address(this).balance);
    }

    function getItem(uint256 _id) public view returns (uint256, bool) {
        return itemToken.getItem(_id);
    }

    function getItemCount() public view returns (uint256) {
        return itemToken.getItemCount();
    }

    function() external payable {} // sendValue's tests require the contract to hold Ether
}
