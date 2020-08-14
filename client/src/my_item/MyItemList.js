import React, { useState, useEffect } from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import Item from './Item'
import withDrizzleContext from '../common/withDrizzleContext'

function MyItemList (props) {
  const [count, setCount] = useState(0)

  const fetchItemCount = async (contract) => {
    const count = await contract.methods.getItemCount().call()
    setCount(count)
  }

  useEffect(() => {
    if (props.drizzle.web3.currentProvider.constructor.name === 'WebsocketProvider') {
      alert('wallet addressに接続してください')
      return
    }
    fetchItemCount(props.drizzle.contracts.ItemShop)
  }, [props.drizzleState])

  const items = []
  for (let index = 0; index < count; index++) {
    items.push(<Item key={index} id={index} selectFunc={props.selectFunc} isSelected={props.selectedId === index}/>)
  }

  return (
    <CardColumns>
      {items}
    </CardColumns>
  )
}

export default withDrizzleContext(MyItemList)
