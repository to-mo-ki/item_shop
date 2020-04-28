import React, { useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import MyItemKeyContext from './MyItemKey'
import MyItemList from './MyItemList'

function ShowMyItem (props) {
  useEffect(() => {
    props.fetchItemKeys(props.drizzle.contracts.ItemShop)
  }, [])

  const { ItemShop } = props.drizzleState.contracts
  const itemToOwner = props.itemToOwnerKeys.map(key =>
    ItemShop.ownerOf[key] ? ItemShop.ownerOf[key].value : undefined
  )
  return <MyItemList itemToOwner={itemToOwner} account={props.drizzleState.accounts[0]} />
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <MyItemKeyContext.Consumer>
        {({ itemToOwnerKeys, fetchItemKeys }) => (
          <ShowMyItem
            drizzle={drizzle}
            drizzleState={drizzleState}
            itemToOwnerKeys={itemToOwnerKeys}
            fetchItemKeys={fetchItemKeys}
          />
        )}
      </MyItemKeyContext.Consumer>
    )}
  </DrizzleContext.Consumer>
)
export default withContext
