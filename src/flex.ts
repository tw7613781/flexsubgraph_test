import {
    FLEX as FLEXContract,
    Transfer as TransferEvent
} from "../generated/FLEX/FLEX"
import { User, TransferHistory } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
    let user = User.load(event.params._to.toHex())

    if (!user) {
        user = new User(event.params._to.toHex())
        user.address = event.params._to.toHex()
        user.createdAtTimestamp = event.block.timestamp
    }

    let flexContract = FLEXContract.bind(event.address)
    user.balance = flexContract.balanceOf(event.params._to)
    user.save();

    let transferHistory = new TransferHistory(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    transferHistory.blockHeight = event.block.number
    transferHistory.txHash = event.transaction.hash.toHex()
    transferHistory.sender = event.params._from.toHex()
    transferHistory.receiver = event.params._to.toHex()
    transferHistory.amount = event.params._value
    transferHistory.save()

}