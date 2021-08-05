const Migrations = artifacts.require("Migrations");
const Iron = artifacts.require("Iron");
const Aluminium = artifacts.require("Aluminium");
const Copper = artifacts.require("Copper");
const Gold = artifacts.require("Gold");
const Titanium = artifacts.require("Titanium");
const Marsmello = artifacts.require("Marsmello");
const MarsmelloGAme = artifacts.require("MarsmelloGame");

module.exports = async function(deployer) {
    await deployer.deploy(Migrations);
    await deployer.deploy(Marsmello);
    const mm = await Marsmello.deployed();

    await deployer.deploy(Iron);
    await deployer.deploy(Aluminium);
    await deployer.deploy(Copper);
    await deployer.deploy(Gold);
    await deployer.deploy(Titanium);
    await deployer.deploy(MarsmelloGame, mm.address);

    const mmg = await MarsmelloGame.deployed();
    const fe = await Iron.deployed();
    const al = await Aluminium.deployed();
    const cu = await Copper.deployed();
    const au = await Gold.deployed();
    const ti = await Titanium.deployed();

    await mmg.addResource(fe.address);
    await mmg.addResource(al.address);
    await mmg.addResource(cu.address);
    await mmg.addResource(au.address);
    await mmg.addResource(ti.address);
    await mmg.addFactoryType(500, true, ["0"], ["27777777777777778"]);
    await mmg.addFactoryType(8000, true, ["1"], ["13888888888888889"]);
    await mmg.addFactoryType(1000, true, ["2"], ["5555555555555556"]);
    await mmg.addFactoryType(1200, true, ["3"], ["2777777777777778"]);
    await mmg.addFactoryType(1500, true, ["4"], ["1388888888888889"]);

    await fe.setMasterContract(mmg.address);
    await al.setMasterContract(mmg.address);
    await cu.setMasterContract(mmg.address);
    await au.setMasterContract(mmg.address);
    await ti.setMasterContract(mmg.address);
};
