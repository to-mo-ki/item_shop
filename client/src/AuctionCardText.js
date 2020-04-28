import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import BidButton from './BidButton'
import CurrentPrice from './CurrentPrice'
import { DrizzleContext } from '@drizzle/react-plugin'

function AuctionCardText (props) {
  const [price, setPrice] = useState(0)
  if (!props.data) return null
  const id = props.id
  const { 0: tokenId, 1: startPrice, 2: endPrice, 3: duration, 4: owner, 5: createdAt } = props.data
  const startWeiPrice = props.drizzle.web3.utils.fromWei(startPrice, 'ether')
  const endWeiPrice = props.drizzle.web3.utils.fromWei(endPrice, 'ether')

  return <Card.Body>
    <Card.Title>{id}</Card.Title>
    <Card.Text>
        tokenID:{tokenId}<br />
        startPrice:{startWeiPrice}<br />
        endPrice:{endWeiPrice}<br />
        duration:{duration}<br />
        owner:{owner}<br />
        createdAt:{createdAt}<br />
        currentPrice:<CurrentPrice id={id} setPrice={setPrice}/><br />
    </Card.Text>
    <BidButton index={id} price={price} />
  </Card.Body>
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <AuctionCardText
        drizzle={drizzle}
        drizzleState={drizzleState}
        id={props.id}
        data={props.data}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
