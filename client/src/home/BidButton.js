import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import withDrizzleContext from '../common/withDrizzleContext'

function BidButton (props) {
  const [stackId, setStackId] = useState(null)

  const bid = () => {
    const { drizzle, drizzleState, index, price } = props
    const contract = drizzle.contracts.ItemShop
    const stackId = contract.methods.bid.cacheSend(index, {
      value: drizzle.web3.utils.toWei(price, 'ether'),
      from: drizzleState.accounts[0]
    })
    setStackId(stackId)
  }

  const getTxStatus = () => {
    const { transactions, transactionStack } = props.drizzleState
    const txHash = transactionStack[stackId]
    if (!txHash || !transactions[txHash]) return ''
    return transactions[txHash].status
  }

  useEffect(() => {
    props.setTxStatus(getTxStatus())
  }, [props.drizzleState])

  return <Button variant="primary" onClick={bid}>buy</Button>
}

export default withDrizzleContext(BidButton)
