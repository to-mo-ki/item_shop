import React, { useState } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import AuctionCardText from './AuctionCardText'

function AuctionList (props) {
  var valids = props.valids
  const rows = props.items.map(function (item, index) {
    if (!valids[index]) return null
    return <Card key={index}>
      <AuctionCardText id={index} data={item} />
    </Card>
  })

  return (
    <CardColumns>
      {rows}
    </CardColumns>
  )
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <AuctionList
        drizzle={drizzle}
        drizzleState={drizzleState}
        items={props.items}
        valids={props.valids}
      />
    )}
  </DrizzleContext.Consumer>
)
export default withContext
