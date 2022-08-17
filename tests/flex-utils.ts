import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer,
  Approval,
  OwnershipTransferred
} from "../generated/FLEX/FLEX"

export function createTransferEvent(
  _from: Address,
  _to: Address,
  _value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return transferEvent
}

export function createApprovalEvent(
  _owner: Address,
  _spender: Address,
  _value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("_spender", ethereum.Value.fromAddress(_spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return approvalEvent
}

export function createOwnershipTransferredEvent(
  _prev_owner: Address,
  _new_owner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "_prev_owner",
      ethereum.Value.fromAddress(_prev_owner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "_new_owner",
      ethereum.Value.fromAddress(_new_owner)
    )
  )

  return ownershipTransferredEvent
}
