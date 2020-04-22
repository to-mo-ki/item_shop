pragma solidity ^0.5.0;

import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";


contract ItemToken is Ownable, ERC721Full {
    struct Item {
        bool sold;
    }

    Item[] public items;

    constructor(string memory name, string memory symbol, string memory baseURI) public ERC721Full(name, symbol) {
        _setBaseURI(baseURI);
    }

    function mintItem() public onlyOwner returns (uint256) {
        items.push(Item(false));
        uint256 newTokenId = items.length - 1;
        _mint(msg.sender, newTokenId);
        return newTokenId;
    }

    function mintItem(string memory _tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = mintItem();
        _setTokenURI(newTokenId, _tokenURI);
        return newTokenId;
    }

    modifier validItemId(uint256 itemId) {
        require(itemId < items.length && itemId >= 0, "Invalid item id");
        _;
    }

    modifier unsold(uint256 _id) {
        require(!items[_id].sold, "sold out");
        _;
    }

    function getItem(uint256 _id) public view validItemId(_id) returns (bool, address) {
        return (items[_id].sold, ownerOf(_id));
    }

    function getItemCount() public view returns (uint256) {
        return items.length;
    }

    function buy(uint256 _id) public payable unsold(_id) {
        items[_id].sold = true;
    }
}
