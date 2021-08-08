// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ERC20I {
    function mintTo(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function burnFromAcc(address from, uint256 amount) external returns (bool);
}

contract MarsmelloGame is Ownable {
    constructor(address _MLO) {
        MLO = _MLO;
        deploy_time = block.timestamp;
        factories.push(Factory(address(0), 0, 0, 0, 0, "Void"));
    }

    uint8 decimal = 18;
    uint256 deploy_time;
    uint256 land_price = 1000 * 10**decimal;
    address MLO;

    struct Land {
        address owner;
        uint64 factory;
        uint128 seed;
    }
    struct Factory {
        address owner;
        uint16 ftype;
        uint16 efficiency;
        int32 x;
        int32 y;
        string name;
    }
    struct User {
        uint64[] factories;
        CoOrdinates[] lands;
        uint128[] flows;
        uint64 lastclaimed;
    }
    struct CoOrdinates {
        int32 x;
        int32 y;
    }
    struct Relay {
        address owner;
        uint128 seed;
        Factory factory;
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
    mapping(int32 => mapping(int32 => Land)) private lands;
    Factory[] private factories;
    Factory_type[] private factory_types;
    mapping(address => User) private users;

    modifier landOwner(int32 x, int32 y) {
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

    event LandE(
        int32 indexed x,
        int32 indexed y,
        address indexed owner,
        uint64 factory,
        uint128 seed
    );

    event FactoryE(
        uint64 indexed id,
        address owner,
        uint16 ftype,
        uint16 efficiency,
        int32 indexed x,
        int32 indexed y,
        string name
    );

    event FactoryNameChange(uint64 indexed id, string name);
    event Claim(address indexed claimer, uint256 time);
    event FlowChange(address indexed user, uint128[] flows, uint64 lastclaimed);

    function chechUser(address a) public {
        while (users[a].flows.length < tokens.length) {
            users[a].flows.push(0);
        }
    }

    function getUserData(address user)
        public
        view
        returns (
            uint64[] memory,
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

    function mintFactory(string calldata name, uint16 ftype) public {
        require(
            ERC20I(MLO).balanceOf(msg.sender) >= factory_types[ftype].price,
            "Not enough MLO in your wallet to buy land !"
        );
        chechUser(msg.sender);
        uint16 efficiency = uint16(
            50 + (getRandomNumber(factories.length) % 51)
        );
        factories.push(Factory(msg.sender, ftype, efficiency, 0, 0, name));
        ERC20I(MLO).burnFromAcc(msg.sender, factory_types[ftype].price);
        users[msg.sender].factories.push(uint64(factories.length - 1));
        emit FactoryE(
            uint64(factories.length - 1),
            msg.sender,
            ftype,
            efficiency,
            0,
            0,
            name
        );
    }

    function changeFactoryName(uint64 id, string calldata name)
        public
        factoryOwner(id)
    {
        factories[id].name = name;
        emit FactoryNameChange(id, name);
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
            ERC20I(MLO).balanceOf(msg.sender) >= land_price,
            "Not enough MLO in your wallet to buy land !"
        );
        chechUser(msg.sender);
        ERC20I(MLO).burnFromAcc(msg.sender, land_price);
        land_price += land_price / 100;
        uint128 seed = getRandomNumber(land_price);
        lands[x][y] = Land(msg.sender, 0, seed);
        users[msg.sender].lands.push(CoOrdinates(x, y));
        emit LandE(x, y, msg.sender, 0, seed);
    }

    function removeFactory(uint64 fid) public factoryOwner(fid) {
        Factory storage f = factories[fid];
        if (f.x != 0 || f.y != 0) {
            Land storage l = lands[f.x][f.y];
            User storage u = users[msg.sender];
            claimAll();
            for (
                uint256 i = 0;
                i < factory_types[f.ftype].resources.length;
                i++
            ) {
                Resource memory r = factory_types[f.ftype].resources[i];
                if (r.rate < 0) {
                    u.flows[r.id] +=
                        (uint128(-1 * r.rate) * uint128(f.efficiency)) /
                        100;
                } else {
                    uint128 rate = (uint128(r.rate) *
                        f.efficiency *
                        getLandRate(l.seed, f.ftype)) / 10000;
                    require(
                        u.flows[r.id] >= rate,
                        "Removing Factory will remove resource stream which is being used !"
                    );
                    u.flows[r.id] -= rate;
                }
            }
            emit LandE(f.x, f.y, msg.sender, 0, l.seed);
            emit FactoryE(fid, f.owner, f.ftype, f.efficiency, 0, 0, f.name);
            emit FlowChange(msg.sender, u.flows, u.lastclaimed);
            f.x = 0;
            f.y = 0;
            l.factory = 0;
        }
    }

    function placeFactory(
        uint64 fid,
        int32 x,
        int32 y
    ) public landOwner(x, y) factoryOwner(fid) {
        claimAll();
        Land storage l = lands[x][y];
        Factory storage f = factories[fid];
        if (l.factory != 0) removeFactory(l.factory);
        removeFactory(fid);
        User storage u = users[msg.sender];

        l.factory = fid;
        f.x = x;
        f.y = y;
        for (uint256 i = 0; i < factory_types[f.ftype].resources.length; i++) {
            Resource memory r = factory_types[f.ftype].resources[i];
            if (r.rate < 0) {
                require(
                    u.flows[r.id] >=
                        (uint128(-1 * r.rate) * f.efficiency) / 100,
                    "Not enough resource stream to place factory !"
                );
                u.flows[r.id] -=
                    (uint128(-1 * r.rate) * uint128(f.efficiency)) /
                    100;
            } else {
                u.flows[r.id] +=
                    (uint128(r.rate) *
                        uint128(f.efficiency) *
                        getLandRate(lands[x][y].seed, f.ftype)) /
                    10000;
            }
        }
        emit LandE(x, y, l.owner, l.factory, l.seed);
        emit FactoryE(fid, f.owner, f.ftype, f.efficiency, f.x, f.y, f.name);
        emit FlowChange(msg.sender, u.flows, u.lastclaimed);
    }

    function transferLand(
        address to,
        int32 x,
        int32 y
    ) public landOwner(x, y) {
        Land storage l = lands[x][y];
        User storage u = users[msg.sender];

        removeFactory(l.factory);
        if (l.factory != 0) l.factory = 0;
        l.owner = to;
        for (uint256 i = 0; i < u.lands.length; i++) {
            if (u.lands[i].x == x && u.lands[i].y == y) {
                u.lands[i] = CoOrdinates(0, 0);
                break;
            }
        }
        users[to].lands.push(CoOrdinates(x, y));
        emit LandE(x, y, l.owner, l.factory, l.seed);
    }

    function transferFactory(address to, uint64 factory_id)
        public
        factoryOwner(factory_id)
    {
        Factory storage f = factories[factory_id];
        User storage u = users[msg.sender];

        removeFactory(factory_id);
        if (f.x != 0 || f.y != 0) {
            f.x = 0;
            f.y = 0;
        }
        f.owner = to;
        for (uint256 i = 0; i < u.factories.length; i++) {
            if (u.factories[i] == factory_id) {
                u.factories[i] == 0;
                break;
            }
        }
        users[to].factories.push(factory_id);
        emit FactoryE(factory_id, f.owner, f.ftype, f.efficiency, 0, 0, f.name);
    }

    function claimAll() public {
        User storage u = users[msg.sender];
        uint128[] memory amounts = u.flows;
        uint128 t = uint128(block.timestamp) - u.lastclaimed;
        if (t > 86400) t = 86400;
        for (uint256 i = 0; i < amounts.length; i++) {
            amounts[i] *= t;
        }
        for (uint256 i = 0; i < amounts.length; i++) {
            if (amounts[i] > 0)
                require(ERC20I(tokens[i]).mintTo(msg.sender, amounts[i]));
        }
        u.lastclaimed = uint64(block.timestamp);
        emit Claim(msg.sender, block.timestamp);
    }

    function getLand(int32 x, int32 y) public view returns (Land memory) {
        return lands[x][y];
    }
}
