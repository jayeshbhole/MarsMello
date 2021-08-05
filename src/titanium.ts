import { Titanium, Transfer } from "../generated/Titanium/Titanium";
import { User } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
    let contract = Titanium.bind(event.address);

    let to = new User(event.params.to.toHex());
    to.ti = contract.balanceOf(event.params.to);
    to.save();

    let from = new User(event.params.from.toHex());
    from.ti = contract.balanceOf(event.params.from);
    from.save();
}
