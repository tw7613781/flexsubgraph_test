import {
    FLEX as FLEXContract,
    Transfer as TransferEvent
} from "../generated/FLEX/FLEX"
import { User, TransferHistory } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
    let flexContract = FLEXContract.bind(event.address)

    let userFrom = User.load(event.params._from.toHex())
    if (!userFrom) {
        userFrom = new User(event.params._from.toHex())
        userFrom.address = event.params._from.toHex()
        userFrom.createdAtTimestamp = event.block.timestamp
    }
    userFrom.balance = flexContract.balanceOf(event.params._from)
    userFrom.save();

    let userTo = User.load(event.params._to.toHex())
    if (!userTo) {
        userTo = new User(event.params._to.toHex())
        userTo.address = event.params._to.toHex()
        userTo.createdAtTimestamp = event.block.timestamp
    }
    userTo.balance = flexContract.balanceOf(event.params._to)
    userTo.save();

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