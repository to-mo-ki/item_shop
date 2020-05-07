import React from 'react'
import Card from 'react-bootstrap/Card'
import BidButton from './BidButton'
import useAuction from './useAuction'
import ItemTitleAndImage from './ItemTitleAndImage'
import useCurrentPrice from './useCurrentPrice'
import { Row, Col, Container } from 'react-bootstrap'
import withDrizzleContext from './withDrizzleContext'

function displayDuration (duration) {
  if (duration % (60 * 60 * 24) === 0) return duration / (60 * 60 * 24) + '日'
  if (duration % (60 * 60) === 0) return duration / (60 * 60) + '時間'
  if (duration % 60 === 0) return duration / 60 + '分'
  return duration + '秒'
}
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
        duration:{displayDuration(duration)}<br />
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
      <BidButton index={id} price={price} setTxStatus={props.setTxStatus}/>
    </Card.Body>
  </Card>)
}

export default withDrizzleContext(AuctionCard)
