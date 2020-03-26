pragma solidity ^0.6.0;

import "../openzeppelin-contracts/contracts/access/Ownable.sol";
import "../openzeppelin-contracts/contracts/token/ERC721/ERC721Full.sol";
import "../openzeppelin-contracts/contracts/payment/PullPayment.sol";

contract ItemToken is Ownable, ERC721Full, PullPayment {
    struct Item {
        uint256 price;
        bool sold;
    }

    Item[] internal items;

    constructor() public ERC721Full("ItemShop", "IS") {}

    function mintItem(uint256 _price) public onlyOwner {
        items.push(Item(_price, false));
        uint256 newTokenId = items.length - 1;
        _mint(msg.sender, newTokenId);
    }

}
