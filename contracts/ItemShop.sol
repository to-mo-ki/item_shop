pragma solidity ^0.5.0;

import "./ItemToken.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";


contract ItemShop is Ownable {
    using Address for address payable;

    ItemToken public itemToken;

    uint256 secondsPerBlock;

    struct Auction {
        uint256 tokenId;
        uint256 startPrice;
        uint256 endPrice;
        uint256 duration;
        address owner;
        uint256 createdAt;
    }

    Auction[] auctions;

    constructor(ItemToken _itemToken, uint256 _secondsPerBlock) public {
        itemToken = _itemToken;
        secondsPerBlock = _secondsPerBlock;
    }

    function exhibit(uint256 tokenId, uint256 startPrice, uint256 endPrice, uint256 duration) public {
        require(tokenId < getItemCount(), "ItemShop: nonexist item id");
        require(startPrice > 0 && endPrice > 0, "ItemShop: zero price");
        require(startPrice >= endPrice, "ItemShop: start price is lower than end price");
        require(duration > 0, "ItemShop: zero duration");
        uint256 createdAt = block.number;
        address owner = itemToken.ownerOf(tokenId);
        Auction memory newAuction = Auction(tokenId, startPrice, endPrice, duration, owner, createdAt);
        auctions.push(newAuction);
    }

    function getAuction(uint256 _id) public view returns (uint256, uint256, uint256, uint256, address, uint256) {
        require(_id < auctions.length, "ItemShop: nonexist auction id");
        Auction storage auction = auctions[_id];
        return (
            auction.tokenId,
            auction.startPrice,
            auction.endPrice,
            auction.duration,
            auction.owner,
            auction.createdAt
        );
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
