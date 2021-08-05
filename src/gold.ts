import { Gold, Transfer } from "../generated/Gold/Gold";
import { User } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
    let contract = Gold.bind(event.address);

    let to = new User(event.params.to.toHex());
    to.au = contract.balanceOf(event.params.to);
    to.save();

    let from = new User(event.params.from.toHex());
    from.au = contract.balanceOf(event.params.from);
    from.save();
}
