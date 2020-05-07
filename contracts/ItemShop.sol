pragma solidity ^0.5.0;

import "./ItemToken.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";


contract ItemShop is ItemToken {
    event Exhibit(uint256 _id);
    event Bid(uint256 _id);
    using Address for address payable;

    uint256 secondsPerBlock;

    struct Auction {
        uint256 tokenId;
        uint256 startPrice;
        uint256 endPrice;
        uint256 duration;
        address owner;
        uint256 createdAt;
        uint256 createdAtTimestamp;
    }

    Auction[] auctions;

    mapping(uint256 => bool) public valid;
    mapping(uint256 => bool) public itemIsExhibited;

    constructor(string memory name, string memory symbol, string memory baseURI, uint256 _secondsPerBlock)
        public
        ItemToken(name, symbol, baseURI)
    {
        secondsPerBlock = _secondsPerBlock;
    }

    function exhibit(uint256 tokenId, uint256 startPrice, uint256 endPrice, uint256 duration) public {
        require(tokenId < getItemCount(), "ItemShop: nonexist item id");
        require(ownerOf(tokenId) == msg.sender, "ItemShop: exihibit caller is not owner");
        require(startPrice > 0 && endPrice > 0, "ItemShop: zero price");
        require(startPrice >= endPrice, "ItemShop: start price is lower than end price");
        require(duration > 0, "ItemShop: zero duration");
        require(!itemIsExhibited[tokenId], "ItemShop: this item is exhibited");
        itemIsExhibited[tokenId] = true;
        uint256 createdAt = block.number * secondsPerBlock;
        address owner = ownerOf(tokenId);
        Auction memory newAuction = Auction(tokenId, startPrice, endPrice, duration, owner, createdAt, now);
        uint256 newId = auctions.push(newAuction) - 1;
        valid[newId] = true;
        approve(address(this), tokenId);
        emit Exhibit(newId);
    }

    function getAuction(uint256 _id) public view returns (uint256, uint256, uint256, uint256, address, uint256, uint256) {
        require(_id < auctions.length, "ItemShop: nonexist auction id");
        Auction storage auction = auctions[_id];
        return (
            auction.tokenId,
            auction.startPrice,
            auction.endPrice,
            auction.duration,
            auction.owner,
            auction.createdAt,
            auction.createdAtTimestamp
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

    function bid(uint256 _id) public payable {
        require(valid[_id], "ItemShop: invalid auction");
        uint256 price = getCurrentPriceById(_id);
        require(msg.value >= price, "ItemShop: invalid price");
        Auction storage auction = auctions[_id];
        address payable owner = address(uint160(auction.owner));
        delete valid[_id];
        uint256 tokenId = auction.tokenId;
        delete itemIsExhibited[tokenId];
        this.safeTransferFrom(owner, msg.sender, tokenId);
        owner.sendValue(msg.value);
        emit Bid(_id);
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

    function withdrawPayments() public onlyOwner {
        msg.sender.sendValue(address(this).balance);
    }

    function getAuctionCount() public view returns (uint256) {
        return auctions.length;
    }

    function() external payable {} // sendValue's tests require the contract to hold Ether
}
