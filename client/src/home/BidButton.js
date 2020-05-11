import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import withDrizzleContext from '../common/withDrizzleContext'
import useTxStatus from '../common/useTxStatus'

function BidButton (props) {
  const [stackId, setStackId] = useState(null)

  useTxStatus('入札', stackId, props.drizzleState)

  const bid = () => {
    const { drizzle, drizzleState, index, price } = props
    const contract = drizzle.contracts.ItemShop
    const stackId = contract.methods.bid.cacheSend(index, {
      value: drizzle.web3.utils.toWei(price, 'ether'),
      from: drizzleState.accounts[0]
    })
    setStackId(stackId)
  }

  return <Button variant="primary" onClick={bid}>buy</Button>
}

export default withDrizzleContext(BidButton)
