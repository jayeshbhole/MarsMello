import { Marsmello, Transfer } from "../generated/Marsmello/Marsmello";
import { User } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
    let contract = Marsmello.bind(event.address);

    let to = new User(event.params.to.toHex());
    to.mlo = contract.balanceOf(event.params.to);
    to.save();

    let from = new User(event.params.from.toHex());
    from.mlo = contract.balanceOf(event.params.from);
    from.save();
}
