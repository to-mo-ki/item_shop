import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'
import AuctionCardText from './AuctionCardText'

function AuctionCard (props) {
  const [data, setData] = useState(null)
  const [key, setKey] = useState('')

  useEffect(() => {
    const contract = props.drizzle.contracts.ItemShop
    const key = contract.methods.getAuction.cacheCall(props.id)
    setKey(key)
  }, [props.id])

  useEffect(() => {
    const contract = props.drizzleState.contracts.ItemShop
    const data = contract.getAuction[key] ? contract.getAuction[key].value : undefined
    setData(data)
  }, [key, props.drizzleState])
  return (<Card key={props.id}>
    <AuctionCardText data={data} id={props.id}/>
  </Card>)
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <AuctionCard
        drizzle={drizzle}
        drizzleState={drizzleState}
        id={props.id}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
