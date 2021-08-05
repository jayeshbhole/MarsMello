// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Marsmello is ERC20, Ownable, ERC20Burnable {
    address private _mastercontract;

    constructor() ERC20("MarsMello", "MLO") {
        _mint(msg.sender, 5 * (10**9) * (10**decimals()));
    }

    modifier onlyMaster() {
        require(
            _mastercontract == msg.sender,
            "Function only for MarsMelloGame contract!"
        );
        _;
    }

    function mint(uint256 amount) external onlyOwner returns (bool) {
        _mint(msg.sender, amount * 10**decimals());
        return true;
    }

    function mintTo(address to, uint256 amount)
        external
        onlyMaster
        returns (bool)
    {
        _mint(to, amount);
        return true;
    }

    function burnFromAcc(address from, uint256 amount)
        external
        onlyMaster
        returns (bool)
    {
        _burn(from, amount);
        return true;
    }

    function master() public view returns (address) {
        return _mastercontract;
    }

    function setMasterContract(address _newmaster)
        external
        onlyOwner
        returns (bool)
    {
        _mastercontract = _newmaster;
        return true;
    }
}
