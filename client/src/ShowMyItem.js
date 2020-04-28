import React, { useEffect, useState } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import MyItemList from './MyItemList'

function ShowMyItem (props) {
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
  }, [props.drizzle])

  const { ItemShop } = props.drizzleState.contracts
  const itemToOwner = keys.map(key =>
    ItemShop.ownerOf[key] ? ItemShop.ownerOf[key].value : undefined
  )
  return <MyItemList itemToOwner={itemToOwner} account={props.drizzleState.accounts[0]} />
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ShowMyItem
        drizzle={drizzle}
        drizzleState={drizzleState}
      />
    )}
  </DrizzleContext.Consumer>
)
export default withContext
