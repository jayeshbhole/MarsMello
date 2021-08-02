// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ERC20I {
    function mintTo(address to, uint256 amount) external returns (bool);
}

contract Marsmello is ERC20, Ownable {
    constructor() ERC20(m_name, m_symbol) {
        _mint(msg.sender, m_supply * 10**decimals());
        deploy_time = block.timestamp;
        factories.push(Factory("Void", address(0), 0, 0, CoOrdinates(0, 0)));
    }

    string m_name = "MarsMello";
    string m_symbol = "MLO";
    uint256 m_supply = 10**9;
    uint256 deploy_time;
    uint256 randomness = 12345678901234567890;
    uint256 land_price = 1000 * 10**decimals();
    uint256 resources_count = 5;

    uint256 factory_count = 0;
    struct Land {
        address owner;
        uint128 seed;
        uint128 ontop;
    }
    struct Factory {
        string name;
        address owner;
        uint64 ftype;
        uint64 efficiency;
        CoOrdinates placedon;
    }
    struct User {
        uint128[] factories;
        CoOrdinates[] lands;
        uint128[] flows;
        uint64 lastclaimed;
    }
    struct CoOrdinates {
        int128 x;
        int128 y;
    }
    struct Relay {
        address owner;
        uint128 seed;
        Factory ontop;
    }
    struct Resource {
        uint128 id;
        int128 rate;
    }
    struct Factory_type {
        uint128 price;
        Resource[] resources;
        bool land_dependent;
    }
    address[] private tokens;

    mapping(int128 => mapping(int128 => Land)) private lands;
    Factory[] private factories;
    Factory_type[] private factory_types;
    mapping(address => User) private users;

    modifier landOwner(int128 x, int128 y) {
        require(
            lands[x][y].owner == msg.sender,
            "Land doesn't belong to you !"
        );
        _;
    }
    modifier factoryOwner(uint256 id) {
        require(
            factories[id].owner == msg.sender,
            "Factory doesn't belong to you !"
        );
        _;
    }

    function chechUser(address a) public {
        while (users[a].flows.length < resources_count) {
            users[a].flows.push(0);
        }
    }

    function getUserData(address user)
        public
        view
        returns (
            uint128[] memory,
            CoOrdinates[] memory,
            uint128[] memory,
            uint64
        )
    {
        return (
            users[user].factories,
            users[user].lands,
            users[user].flows,
            users[user].lastclaimed
        );
    }

    function getLandPrice() public view returns (uint256) {
        return (land_price);
    }

    function getRandomNumber(uint256 rand) public view returns (uint128) {
        return
            uint128(
                uint256(
                    keccak256(
                        abi.encodePacked(blockhash(block.number - 1), rand)
                    )
                )
            );
    }

    function addFactoryType(
        uint128 price,
        bool land_dependent,
        uint128[] calldata r1,
        int128[] calldata r2
    ) public onlyOwner returns (uint256) {
        require(r1.length == r2.length, "Array length mismatch!");
        factory_types.push();
        uint256 id = factory_types.length - 1;
        factory_types[id].price = price;
        factory_types[id].land_dependent = land_dependent;
        for (uint256 i = 0; i < r1.length; i++) {
            factory_types[id].resources.push(Resource(r1[i], r2[i]));
        }
        return id;
    }

    function deletefactoryType() public onlyOwner {
        factory_types.pop();
    }

    function getFactoryType() public view returns (Factory_type[] memory) {
        return factory_types;
    }

    function addResource(address token_address)
        public
        onlyOwner
        returns (uint256)
    {
        tokens.push(token_address);
        return (tokens.length - 1);
    }

    function editResource(uint256 id, address token_address) public onlyOwner {
        tokens[id] = token_address;
    }

    function deleteResource() public onlyOwner {
        tokens.pop();
    }

    function getResource() public view returns (address[] memory) {
        return tokens;
    }

    function mintFactory(string calldata name, uint8 ftype) public {
        require(
            balanceOf(msg.sender) >= factory_types[ftype].price,
            "Not enough MLO in your wallet to buy land !"
        );
        chechUser(msg.sender);
        uint128 seed = getRandomNumber(factories.length);
        factories.push(
            Factory(
                name,
                msg.sender,
                ftype,
                uint64(50 + (seed % 51)),
                CoOrdinates(0, 0)
            )
        );
        _transfer(msg.sender, address(this), factory_types[ftype].price);
        users[msg.sender].factories.push(uint64(factories.length - 1));
    }

    function getLandRate(uint128 seed, uint64 ftype)
        public
        view
        returns (uint128)
    {
        if (factory_types[ftype].land_dependent == false) return 100;
        return uint128(50 + ((seed / (10**(ftype % 35))) % 51));
    }

    function mintLand(int32 x, int32 y) public {
        require(x != 0 || y != 0, "Can't buy spawn !");
        require(lands[x][y].owner == address(0), "Land already exists !");
        require(
            balanceOf(msg.sender) >= land_price,
            "Not enough MLO in your wallet to buy land !"
        );
        chechUser(msg.sender);
        _transfer(msg.sender, address(this), land_price);
        land_price += land_price / 100;
        uint128 seed = getRandomNumber(land_price);
        lands[x][y] = Land(msg.sender, seed, 0);
        users[msg.sender].lands.push(CoOrdinates(x, y));
    }

    function _clearLand(CoOrdinates memory c) private {
        if (c.x != 0 || c.y != 0) lands[c.x][c.y].ontop = 0;
    }

    function _clearFactory(uint256 id) private {
        if (
            id != 0 &&
            (factories[id].placedon.x != 0 || factories[id].placedon.y != 0)
        ) {
            factories[id].placedon = CoOrdinates(0, 0);
        }
    }

    function placeFactory(
        uint64 factory_id,
        int128 x,
        int128 y
    ) public landOwner(x, y) factoryOwner(factory_id) {
        claimAll();
        _clearFactory(lands[x][y].ontop);
        _clearLand(factories[factory_id].placedon);

        lands[x][y].ontop = factory_id;
        Factory storage f = factories[factory_id];
        f.placedon = CoOrdinates(x, y);
        for (uint256 i = 0; i < factory_types[f.ftype].resources.length; i++) {
            Resource memory r = factory_types[f.ftype].resources[i];
            if (r.rate < 0) {
                require(
                    users[msg.sender].flows[r.id] >
                        uint128(-1 * r.rate) * uint128(f.efficiency),
                    "Not enough resource stream to place factory !"
                );
                users[msg.sender].flows[r.id] -=
                    uint128(-1 * r.rate) *
                    uint128(f.efficiency);
            } else {
                users[msg.sender].flows[r.id] +=
                    (uint128(r.rate) *
                        uint128(f.efficiency) *
                        getLandRate(lands[x][y].seed, f.ftype)) /
                    100;
            }
        }
    }

    function transferLand(
        address to,
        int128 x,
        int128 y
    ) public landOwner(x, y) {
        _clearFactory(lands[x][y].ontop);
        _clearLand(CoOrdinates(x, y));
        lands[x][y].owner = to;
        for (uint256 i = 0; i < users[msg.sender].lands.length; i++) {
            if (
                users[msg.sender].lands[i].x == x &&
                users[msg.sender].lands[i].y == y
            ) {
                users[msg.sender].lands[i] = CoOrdinates(0, 0);
                break;
            }
        }
        users[to].lands.push(CoOrdinates(x, y));
    }

    function transferFactory(address to, uint64 factory_id)
        public
        factoryOwner(factory_id)
    {
        Factory storage f = factories[factory_id];
        _clearLand(f.placedon);
        _clearFactory(factory_id);
        f.owner = to;
        for (uint256 i = 0; i < users[msg.sender].factories.length; i++) {
            if (users[msg.sender].factories[i] == factory_id) {
                users[msg.sender].factories[i] == 0;
                break;
            }
        }
        users[to].factories.push(factory_id);
    }

    function claimAll() public {
        uint128[] memory amounts = users[msg.sender].flows;
        uint128 t = uint128(block.timestamp) - users[msg.sender].lastclaimed;
        if (t > 86400) t = 86400;
        for (uint256 i = 0; i < amounts.length; i++) {
            amounts[i] *= t;
        }
        for (uint256 i = 0; i < amounts.length; i++) {
            if (amounts[i] > 0)
                require(ERC20I(tokens[i]).mintTo(msg.sender, amounts[i]));
        }
        users[msg.sender].lastclaimed = uint64(block.timestamp);
    }

    function getArea(int128 x, int128 y)
        public
        view
        returns (Relay[41][41] memory)
    {
        Relay[41][41] memory r;
        for (uint128 i = 0; i < 41; i++) {
            for (uint128 j = 0; j < 41; j++) {
                Land memory l = lands[x - 20 + int128(i)][y - 20 + int128(j)];
                r[i][j] = Relay(l.owner, l.seed, factories[l.ontop]);
            }
        }
        return r;
    }
}
