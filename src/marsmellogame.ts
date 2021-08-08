import { BigInt } from "@graphprotocol/graph-ts";
import { MarsmelloGame, LandE, FactoryE, FactoryNameChange, Claim, FlowChange } from "../generated/MarsmelloGame/MarsmelloGame";
import { User, Land, Factory } from "../generated/schema";

function convert(i: i32): string {
    return BigInt.fromI32(i).toString();
}

export function handleLand(event: LandE): void {
    let lid = convert(event.params.x) + "," + convert(event.params.y);
    let l = Land.load(lid);
    if (l == null) {
        l = new Land(lid);
        l.x = event.params.x;
        l.y = event.params.y;
        l.seed = event.params.seed;
    }
    l.owner = event.params.owner.toHex();
    if (event.params.factory.equals(BigInt.fromI32(0))) {
        l.factory = null;
    } else {
        l.factory = event.params.factory.toString();
    }
    l.save();
}

export function handleFactory(event: FactoryE): void {
    let f = Factory.load(event.params.id.toString());
    if (f == null) {
        f = new Factory(event.params.id.toString());
        f.type = event.params.ftype;
        f.efficiency = event.params.efficiency;
    }
    f.owner = event.params.owner.toHex();
    f.x = event.params.x;
    f.y = event.params.y;
    f.name = event.params.name;
    f.save();
}

export function handleFactoryNameChange(event: FactoryNameChange): void {
    let f = new Factory(event.params.id.toString());
    f.name = event.params.name;
    f.save();
}

export function handleClaim(event: Claim): void {
    let u = new User(event.params.claimer.toHex());
    u.lastclaimed = event.params.time;
    u.save();
}

export function handleFlowChange(event: FlowChange): void {
    let u = new User(event.params.user.toHex());
    u.flows = event.params.flows;
    u.lastclaimed = event.params.lastclaimed;
    u.save();
}
