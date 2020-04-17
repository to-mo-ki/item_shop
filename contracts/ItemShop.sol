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

    mapping(uint256 => bool) public valid;

    constructor(ItemToken _itemToken, uint256 _secondsPerBlock) public {
        itemToken = _itemToken;
        secondsPerBlock = _secondsPerBlock;
    }

    function exhibit(uint256 tokenId, uint256 startPrice, uint256 endPrice, uint256 duration) public {
        require(tokenId < getItemCount(), "ItemShop: nonexist item id");
        require(itemToken.ownerOf(tokenId) == msg.sender, "ItemShop: exihibit caller is not owner");
        require(startPrice > 0 && endPrice > 0, "ItemShop: zero price");
        require(startPrice >= endPrice, "ItemShop: start price is lower than end price");
        require(duration > 0, "ItemShop: zero duration");
        uint256 createdAt = block.number * secondsPerBlock;
        address owner = itemToken.ownerOf(tokenId);
        Auction memory newAuction = Auction(tokenId, startPrice, endPrice, duration, owner, createdAt);
        uint256 newId = auctions.push(newAuction) - 1;
        valid[newId] = true;
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

    function getCurrentPrice(
        uint256 startPrice,
        uint256 endPrice,
        uint256 duration,
        uint256 createdAt,
        uint256 nowSecond
    ) public pure returns (uint256) {
        uint256 secondsPassed = nowSecond - createdAt;
        if (secondsPassed >= duration) {
            return endPrice;
        }
        uint256 totalPriceChange = startPrice - endPrice;
        uint256 currentPriceChange = (totalPriceChange * secondsPassed) / duration;
        uint256 currentPrice = startPrice - currentPriceChange;

        return currentPrice;
    }

    function getCurrentPriceById(uint256 _id) public view returns (uint256) {
        // revertで書き換え
        if (!valid[_id]) return 0;
        Auction storage auction = auctions[_id];
        return
            getCurrentPrice(
                auction.startPrice,
                auction.endPrice,
                auction.duration,
                auction.createdAt,
                block.number * secondsPerBlock
            );
    }

    function mintItem(uint256 _price) public onlyOwner {
        uint256 itemId = itemToken.mintItem(_price);
        itemToken.safeTransferFrom(address(this), owner(), itemId);
    }

    function buy(uint256 _id) public payable {
        uint256 price;
        (price, , ) = itemToken.getItem(_id);
        require(msg.value == price * 1 ether, "Invalid price");
        itemToken.buy(_id);
        itemToken.safeTransferFrom(address(this), msg.sender, _id);
    }

    function withdrawPayments() public onlyOwner {
        msg.sender.sendValue(address(this).balance);
    }

    function getItem(uint256 _id) public view returns (uint256, bool, address) {
        return itemToken.getItem(_id);
    }

    function getItemCount() public view returns (uint256) {
        return itemToken.getItemCount();
    }

    function getAuctionCount() public view returns (uint256) {
        return auctions.length;
    }

    function() external payable {} // sendValue's tests require the contract to hold Ether
}
