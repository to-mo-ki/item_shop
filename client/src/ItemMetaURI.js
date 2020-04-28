import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import { DrizzleContext } from '@drizzle/react-plugin'

function ItemMetaURI (props) {
  const [itemMetaURI, setItemMetaURI] = useState('')
  const [key, setKey] = useState('')

  useEffect(() => {
    const contract = props.drizzle.contracts.ItemShop
    const key = contract.methods.tokenURI.cacheCall(props.id)
    setKey(key)
  }, [props.id])

  useEffect(() => {
    const contract = props.drizzleState.contracts.ItemShop
    const itemMetaURI = contract.tokenURI[key] ? contract.tokenURI[key].value : undefined
    setItemMetaURI(itemMetaURI)
  }, [key, props.drizzleState])

  return <ItemCard id={props.id} URI={itemMetaURI} />
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemMetaURI
        drizzle={drizzle}
        drizzleState={drizzleState}
        id={props.id}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
