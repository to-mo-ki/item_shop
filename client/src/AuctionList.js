import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import CardColumns from 'react-bootstrap/CardColumns'
import AuctionCard from './AuctionCard'

function AuctionList (props) {
  const [keys, setKeys] = useState([])

  const fetchAuctionKeys = async (contract) => {
    const itemCount = await contract.methods.getAuctionCount().call()
    const keys = []
    for (let i = 0; i < itemCount; i++) {
      keys.push(contract.methods.valid.cacheCall(i))
    }
    setKeys(keys)
  }

  useEffect(() => {
    fetchAuctionKeys(props.drizzle.contracts.ItemShop)
  }, [props.drizzle])

  const { ItemShop } = props.drizzleState.contracts
  const rows = keys.map(function (key, index) {
    if (!ItemShop.valid[key]) return null
    console.log(index)
    return <AuctionCard key={index} id={index}/>
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
      />
    )}
  </DrizzleContext.Consumer>
)
export default withContext
