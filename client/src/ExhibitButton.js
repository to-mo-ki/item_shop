import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import withDrizzleContext from './withDrizzleContext'

const style = {
  margin: '10px'
}
function ExhibitButton (props) {
  const [stackId, setStackId] = useState('')

  const onClick = (index, startPrice, endPrice, duration) => {
    const { drizzle, drizzleState } = props
    const contract = drizzle.contracts.ItemShop
    const startWeiPrice = drizzle.web3.utils.toWei(startPrice, 'ether')
    const endWeiPrice = drizzle.web3.utils.toWei(endPrice, 'ether')
    const stackId = contract.methods.exhibit.cacheSend(index, startWeiPrice, endWeiPrice, duration, {
      from: drizzleState.accounts[0]
    })
    setStackId(stackId)
  }

  const getTxStatus = () => {
    const { transactions, transactionStack } = props.drizzleState
    const txHash = transactionStack[stackId]
    if (!txHash) return null
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`
  }

  var { index, startPrice, endPrice, duration } = props
  var button = <Button variant="primary" style={style} onClick={() => onClick(index, startPrice, endPrice, duration)}>Exihibit</Button>
  return (<div>
    {button}
    {getTxStatus()}
  </div>)
}

export default withDrizzleContext(ExhibitButton)
