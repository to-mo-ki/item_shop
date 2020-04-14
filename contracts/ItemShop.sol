pragma solidity ^0.6.0;

import "./ItemToken.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/payment/PullPayment.sol";

contract ItemShop is Ownable, PullPayment {
    ItemToken public itemToken;

    constructor(ItemToken _itemToken) public {
        itemToken = _itemToken;
    }

    function withdrawPayments() public onlyOwner{
        address payable owner = payable(owner());
        super.withdrawPayments(owner);
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
        _asyncTransfer(owner(), msg.value);
    }

    function getItem(uint256 _id) public view returns (uint256, bool) {
        return itemToken.getItem(_id);
    }

    function getItemCount() public view returns (uint256) {
        return itemToken.getItemCount();
    }

}
