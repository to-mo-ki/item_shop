import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import withDrizzleContext from '../common/withDrizzleContext'
import useTxStatus from '../common/useTxStatus'

const style = {
  margin: '10px'
}

function isValidData (index, startPrice, endPrice) {
  if (index === -1) {
    alert('アイテムを選択してください')
    return false
  }
  if (startPrice <= endPrice) {
    alert('開始価格は終了価格より大きくしてください')
    return false
  }
  return true
}

function isPositiveNumber (str) {
  const res = Number(str)
  if (!isNaN(res) && res > 0) {
    return true
  }
  return false
}

function ExhibitButton (props) {
  const [stackId, setStackId] = useState('')
  useTxStatus('出品', stackId, props.drizzleState)

  const onClick = (index, startPrice, endPrice, duration) => {
    if (!(isPositiveNumber(startPrice) && isPositiveNumber(endPrice) && isPositiveNumber(duration))) {
      alert('開始価格・終了価格・期間はすべて正の数にしてください')
      return
    }
    if (!Number.isInteger(duration)) {
      alert('期間は整数にしてください')
      return
    }
    if (!isValidData(index, startPrice, endPrice)) return
    const { drizzle, drizzleState } = props
    const contract = drizzle.contracts.ItemShop
    const startWeiPrice = drizzle.web3.utils.toWei(startPrice, 'ether')
    const endWeiPrice = drizzle.web3.utils.toWei(endPrice, 'ether')
    console.log(index, startWeiPrice, endWeiPrice, duration)
    const stackId = contract.methods.exhibit.cacheSend(index, startWeiPrice, endWeiPrice, duration, {
      from: drizzleState.accounts[0]
    })
    setStackId(stackId)
  }

  var { index, startPrice, endPrice, duration } = props
  return <Button variant="primary" style={style} onClick={() => onClick(index, startPrice, endPrice, duration)}>Exihibit</Button>
}

export default withDrizzleContext(ExhibitButton)
