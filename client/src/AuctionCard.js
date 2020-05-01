import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'
import AuctionCardText from './AuctionCardText'
import useAuction from './useAuction'

function AuctionCard (props) {
  const data = useAuction(props.id, props.drizzle, props.drizzleState)
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
