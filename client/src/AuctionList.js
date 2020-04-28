import React, { useState } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import BidButton from './BidButton'
import CurrentPrice from './CurrentPrice'

function AuctionList (props) {
  const [price, setPrice] = useState(0)
  var valids = props.valids
  const drizzle = props.drizzle
  const rows = props.items.map(function (item, index) {
    if (!valids[index]) return null
    // 全てが取得できているとは限らない
    if (item.length == 0) { return null }
    var tokenId = item[0]
    var startWeiPrice = drizzle.web3.utils.fromWei(item[1], 'ether')
    var endWeiPrice = drizzle.web3.utils.fromWei(item[2], 'ether')
    var duration = item[3]
    var owner = item[4]
    var createdAt = item[5]
    return <Card key={index}>
      <Card.Body>
        <Card.Title>{index}</Card.Title>
        <Card.Text>
            tokenID:{tokenId}<br />
            startPrice:{startWeiPrice}<br />
            endPrice:{endWeiPrice}<br />
            duration:{duration}<br />
            owner:{owner}<br />
            createdAt:{createdAt}<br />
            current price:<CurrentPrice id={index} setPrice={setPrice}/><br />
        </Card.Text>
        <BidButton index={index} price={price} />
      </Card.Body>
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
