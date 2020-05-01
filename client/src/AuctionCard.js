import React, { useState } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'
import BidButton from './BidButton'
import useAuction from './useAuction'
import ItemTitleAndImage from './ItemTitleAndImage'
import useCurrentPrice from './useCurrentPrice'
import { Grid, Row, Col, Container } from 'react-bootstrap'

function AuctionCard (props) {
  const data = useAuction(props.id, props.drizzle, props.drizzleState)
  const price = useCurrentPrice(props.id, props.drizzle, props.drizzleState)
  if (!data) return null
  const { 0: tokenId, 1: startPrice, 2: endPrice, 3: duration, 4: owner, 5: createdAt } = data
  const startWeiPrice = props.drizzle.web3.utils.fromWei(startPrice, 'ether')
  const endWeiPrice = props.drizzle.web3.utils.fromWei(endPrice, 'ether')
  const id = props.id

  return (<Card key={props.id}>
    <Card.Body>
      <ItemTitleAndImage id={tokenId} />
      <Card.Text>
        duration:{duration}<br />
        owner:{owner}<br />
        createdAt:{createdAt}<br />
      </Card.Text>
      Price:
      <Container style={{ textAlign: 'center', margin: '10px' }}>
        <Row>
          <Col>start</Col>
          <Col>end</Col>
          <Col>current</Col>
        </Row>
        <Row>
          <Col>{startWeiPrice}</Col>
          <Col>{endWeiPrice}</Col>
          <Col>{price}</Col>
        </Row>
      </Container>
      <BidButton index={id} price={price} />
    </Card.Body>
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
