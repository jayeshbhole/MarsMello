import { Iron, Transfer } from "../generated/Iron/Iron";
import { User } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
    let contract = Iron.bind(event.address);

    let to = new User(event.params.to.toHex());
    to.fe = contract.balanceOf(event.params.to);
    to.save();

    let from = new User(event.params.from.toHex());
    from.fe = contract.balanceOf(event.params.from);
    from.save();
}
