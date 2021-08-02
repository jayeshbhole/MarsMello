const Migrations = artifacts.require("Migrations");
const Iron = artifacts.require("Iron");
const Aluminium = artifacts.require("Aluminium");
const Copper = artifacts.require("Copper");
const Gold = artifacts.require("Gold");
const Titanium = artifacts.require("Titanium");
const Marsmello = artifacts.require("Marsmello");

module.exports = async function (deployer) {
    await deployer.deploy(Migrations);
    await deployer.deploy(Marsmello);
    await deployer.deploy(Iron);
    await deployer.deploy(Aluminium);
    await deployer.deploy(Copper);
    await deployer.deploy(Gold);
    await deployer.deploy(Titanium);
    const mm = await Marsmello.deployed();
    const fe = await Iron.deployed();
    const al = await Aluminium.deployed();
    const cu = await Copper.deployed();
    const au = await Gold.deployed();
    const ti = await Titanium.deployed();

    await mm.addResource(fe.address);
    await mm.addResource(al.address);
    await mm.addResource(cu.address);
    await mm.addResource(au.address);
    await mm.addResource(ti.address);
    await mm.addFactoryType(1000, true, ["0"], ["27777777777777778"]);
    await mm.addFactoryType(1000, true, ["1"], ["13888888888888889"]);
    await mm.addFactoryType(1000, true, ["2"], ["5555555555555556"]);
    await mm.addFactoryType(1000, true, ["3"], ["2777777777777778"]);
    await mm.addFactoryType(1000, true, ["4"], ["1388888888888889"]);

    await fe.setMasterContract(mm.address);
    await al.setMasterContract(mm.address);
    await cu.setMasterContract(mm.address);
    await au.setMasterContract(mm.address);
    await ti.setMasterContract(mm.address);
};
