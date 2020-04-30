import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import CardColumns from 'react-bootstrap/CardColumns'
import ItemCard from './ItemCard'

function MyItemList (props) {
  const [keys, setKeys] = useState([])

  const fetchItemKeys = async (contract) => {
    const itemCount = await contract.methods.getItemCount().call()
    const keys = []
    for (let i = 0; i < itemCount; i++) {
      keys.push(contract.methods.ownerOf.cacheCall(i))
    }
    setKeys(keys)
  }

  useEffect(() => {
    fetchItemKeys(props.drizzle.contracts.ItemShop)
  }, [props.drizzleState])

  const { ItemShop } = props.drizzleState.contracts
  const itemToOwner = keys.map(key =>
    ItemShop.ownerOf[key] ? ItemShop.ownerOf[key].value : undefined
  )
  const account = props.drizzleState.accounts[0]
  const rows = itemToOwner.map(function (owner, index) {
    if (account !== owner) {
      return null
    }
    return <ItemCard key={index} id={index} selectFunc={props.selectFunc}/>
  })

  return (
    <CardColumns>
      {rows}
    </CardColumns>
  )
}

const withContext = (props) => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <MyItemList
        drizzle={drizzle}
        drizzleState={drizzleState}
        selectFunc={props.selectFunc}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
