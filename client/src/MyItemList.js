import React, { useState, useEffect } from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import MyItem from './MyItem'
import withDrizzleContext from './withDrizzleContext'

function MyItemList (props) {
  const [count, setCount] = useState(0)

  const fetchItemCount = async (contract) => {
    const count = await contract.methods.getItemCount().call()
    setCount(count)
  }

  useEffect(() => {
    fetchItemCount(props.drizzle.contracts.ItemShop)
  }, [props.drizzleState])

  const items = []
  for (let index = 0; index < count; index++) {
    items.push(<MyItem key={index} id={index} selectFunc={props.selectFunc} isSelected={props.selectedId === index}/>)
  }

  return (
    <CardColumns>
      {items}
    </CardColumns>
  )
}

export default withDrizzleContext(MyItemList)
