// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract MarsMello is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gold", "GLD") {
        _mint(msg.sender, initialSupply);
    }
}
