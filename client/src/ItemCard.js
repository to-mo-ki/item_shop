import React, { useEffect, useState } from 'react'
import ItemMetaData from './ItemMetaData'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'

function ItemCard (props) {
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
  return (<Card key={props.id}>
    <ItemMetaData URI={itemMetaURI} />
  </Card>)
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemCard
        drizzle={drizzle}
        drizzleState={drizzleState}
        id={props.id}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
