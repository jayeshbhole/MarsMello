pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.2.0/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.2.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.2.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.2.0/token/ERC1155/extensions/ERC1155Burnable.sol";

contract MarsMellow is ERC1155,ERC20, Ownable, ERC1155Burnable {
    
    string m_name = "MarsMellow";
    string m_symbol = "MLO";
    uint m_supply = 1000000000;
    uint deploy_time;
    
    constructor() ERC1155("https://marsmello.io/uri/mello.json") ERC20(m_name, m_symbol) {
        _mint(msg.sender, m_supply * 10 ** decimals());
        deploy_time = block.timestamp;
    }
    
    
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }
