import { Copper, Transfer } from "../generated/Copper/Copper";
import { User } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
    let contract = Copper.bind(event.address);

    let to = new User(event.params.to.toHex());
    to.cu = contract.balanceOf(event.params.to);
    to.save();

    let from = new User(event.params.from.toHex());
    from.cu = contract.balanceOf(event.params.from);
    from.save();
}
