// SPDX-License-Identifier: MIT
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

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
    
    function newLand(int x,int y) public {
        uint test =0;
        if(x<0){
            test+=1;
            x*=-1;
        }
        if(y<0){
            test+=2;
            y*=-1;
        }
        uint deploy_from = ((block.timestamp-deploy_time) / 86400) + 50;
        require(uint(x)<=deploy_from && uint(y)<=deploy_from && deploy_from<1000000000,"Co-Ordinates out of bound !");
        uint id=test*10**20+uint(x)*10**10+uint(y);
        _mint(msg.sender,id,1,"");
    }
}
