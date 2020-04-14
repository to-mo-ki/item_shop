pragma solidity ^0.5.0;

import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ItemToken is Ownable, ERC721 {
    struct Item {
        uint256 price;
        bool sold;
    }

    Item[] public items;

    constructor() public {}

    function mintItem(uint256 _price) public onlyOwner {
        items.push(Item(_price, false));
        uint256 newTokenId = items.length - 1;
        _mint(msg.sender, newTokenId);
    }

    modifier validItemId(uint256 itemId) {
        require(itemId < items.length && itemId >= 0, "Invalid item id");
        _;
    }

    modifier unsold(uint256 _id) {
        require(!items[_id].sold, "sold out");
        _;
    }

    function getItem(uint256 _id)
        public
        view
        validItemId(_id)
        returns (uint256, bool)
    {
        return (items[_id].price, items[_id].sold);
    }

    function getItemCount() public view returns (uint256) {
        return items.length;
    }

    function buy(uint256 _id) public payable unsold(_id) {
        items[_id].sold = true;
    }
}
