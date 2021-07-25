// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.2.0/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.2.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.2.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.2.0/token/ERC1155/extensions/ERC1155Burnable.sol";

contract MarsMellow is ERC1155,ERC20, Ownable, ERC1155Burnable {
    
    constructor() ERC1155("https://marsmello.io/uri/mello.json") ERC20(m_name, m_symbol) {
        _mint(msg.sender, m_supply * 10 ** decimals());
        deploy_time = block.timestamp;
    }
    
    string m_name = "MarsMellow";
    string m_symbol = "MLO";
    uint m_supply = 1000000000;
    uint deploy_time;
    uint randomness = 12345678901234567890;
    uint land_price = 1000*10**decimals();
    
    uint factory_count = 0;
    struct Land{
        address owner;
        uint8[5] ores;
        uint ontop;
    }
    struct Factory{
        string name;
        address owner;
        uint8 ftype;
        uint8 efficiency;
        CoOrdinates placedon;
    }
    struct User{
        uint[] factories;
        CoOrdinates[] lands;
    }
    struct CoOrdinates{
        int x;
        int y;
    }
    
    mapping(int => mapping(int => Land)) private lands;
    Factory[] private factories;
    mapping(address => User) private users;
    
    
    
    
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
    
    
    function getUserData(address user) public view returns(uint[] memory,CoOrdinates[] memory){
        return (users[user].factories,users[user].lands);
    }
    
    function getLandPrice() public view returns(uint){
        return (land_price);
    }
    
    function mintFactory(string memory name,uint8 ftype,uint8 efficiency) public returns(bool) {
        require(balanceOf(msg.sender)>=1000,"Not enough MLO in your wallet to buy land !");
        factories.push(Factory(name,msg.sender,ftype,efficiency,CoOrdinates(0,0)));
        users[msg.sender].factories.push(factories.length-1);
        return true;
    }
    
    function placeFactory(uint factory_id,int x,int y) public returns(bool) {
        require(factories[factory_id].owner==msg.sender,"Factory doesn't belong to you !");
        require(lands[x][y].owner==msg.sender,"Land doesn't belong to you !");
        lands[x][y].ontop=factory_id;
        factories[factory_id].placedon = CoOrdinates(x,y);
        return true;
    }
    
    function mintLand(int x,int y) public returns(bool) {
        require(x!=0 && y!=0,"Can't buy spawn !");
        require(lands[x][y].owner==address(0x0),"Land already exists !");
        require(balanceOf(msg.sender)>=land_price,"Not enough MLO in your wallet to buy land !");
        _transfer(msg.sender,address(this),land_price);
        land_price+=land_price/100;
        uint random =  uint(keccak256(abi.encodePacked(randomness,block.timestamp,land_price)));
        lands[x][y] = Land(msg.sender,[uint8(random%19),uint8(random%17),uint8(random%13),uint8(random%7),uint8(random%5)],0);
        users[msg.sender].lands.push(CoOrdinates(x,y));
        return true;
    }
    
    
    function transferLand(address to,int x,int y) public {
        require(lands[x][y].owner==msg.sender,"You can only transfer what you own");
        lands[x][y].owner = to;
        for(uint i=0;i<users[msg.sender].lands.length;i++){
            if(users[msg.sender].lands[i].x==x && users[msg.sender].lands[i].y==y){
                users[msg.sender].lands[i].x==0;
                users[msg.sender].lands[i].y==0;
                break;
            }
        }
        users[to].lands.push(CoOrdinates(x,y));
        
    }
    
    
    
}
