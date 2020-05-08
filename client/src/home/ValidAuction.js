import React from 'react'
import Card from 'react-bootstrap/Card'
import BidButton from './BidButton'
import useCacheCall from '../common/useCacheCall'
import ItemTitleAndImage from '../common/ItemTitleAndImage'
import useCurrentPrice from './useCurrentPrice'
import { Row, Col, Container } from 'react-bootstrap'
import withDrizzleContext from '../common/withDrizzleContext'

function displayDuration (duration) {
  if (duration % (60 * 60 * 24) === 0) return duration / (60 * 60 * 24) + '日'
  if (duration % (60 * 60) === 0) return duration / (60 * 60) + '時間'
  if (duration % 60 === 0) return duration / 60 + '分'
  return duration + '秒'
}

function timestampToDateTime (timestamp) {
  const d = new Date(timestamp * 1000)
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  var hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours()
  var min = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()
  var sec = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds()
  return year + '年' + month + '月' + day + '日 ' + hour + ':' + min + ':' + sec
}
function ValidAuction (props) {
  const data = useCacheCall('getAuction', props.id, props.drizzle, props.drizzleState)
  const price = useCurrentPrice(props.id, props.drizzle, props.drizzleState)
  if (!data) return null
  const { 0: tokenId, 1: startPrice, 2: endPrice, 3: duration, 4: owner, 5: createdAt, 6: createdAtTimeStamp } = data
  const startWeiPrice = props.drizzle.web3.utils.fromWei(startPrice, 'ether')
  const endWeiPrice = props.drizzle.web3.utils.fromWei(endPrice, 'ether')
  const id = props.id

  return (<Card key={props.id}>
    <Card.Body>
      <ItemTitleAndImage id={tokenId} />
      <Card.Text>
        owner:{owner}<br />
        期間:{displayDuration(duration)}<br />
        開始時間:{timestampToDateTime(createdAtTimeStamp)}<br />
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

export default withDrizzleContext(ValidAuction)
