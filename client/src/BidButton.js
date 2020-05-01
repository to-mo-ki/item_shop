import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Button from 'react-bootstrap/Button'

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

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <BidButton
        drizzle={drizzle}
        drizzleState={drizzleState}
        price={props.price}
        index={props.index}
        setTxStatus={props.setTxStatus}
      />
    )}
  </DrizzleContext.Consumer>
)
export default withContext
