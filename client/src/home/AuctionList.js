import React, { useState, useEffect } from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import withDrizzleContext from '../common/withDrizzleContext'
import Auction from './Auction'

function AuctionList (props) {
  const [txStatus, setTxStatus] = useState('')
  const [count, setCount] = useState(0)

  const fetchAuctionCount = async (contract) => {
    const count = await contract.methods.getAuctionCount().call()
    setCount(count)
  }

  useEffect(() => {
    fetchAuctionCount(props.drizzle.contracts.ItemShop)
  }, [props.drizzleState])

  const auctions = []
  for (let index = 0; index < count; index++) {
    auctions.push(<Auction key={index} id={index} setTxStatus={setTxStatus} />)
  }
  return (
    <>
      Transaction status: {txStatus}
      <CardColumns>
        {auctions}
      </CardColumns>
    </>
  )
}

export default withDrizzleContext(AuctionList)
