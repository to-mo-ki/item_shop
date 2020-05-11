import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import withDrizzleContext from '../common/withDrizzleContext'
import { toast } from 'react-toastify'

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

  useEffect(() => {
    const { transactions, transactionStack } = props.drizzleState
    const txHash = transactionStack[stackId]
    console.log(txHash, transactions[txHash])
    if (!transactions[txHash]) return
    let display
    switch (transactions[txHash].status) {
      case 'pending':
        display = '入札を試みています...'
        toast.info(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      case 'success':
        display = '入札に成功しました'
        toast.success(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      case 'error':
        display = '入札に失敗しました'
        toast.error(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      default:
        break
    }
  }, [props.drizzleState.transactions, props.drizzleState.transactionStack])

  return <Button variant="primary" onClick={bid}>buy</Button>
}

export default withDrizzleContext(BidButton)
