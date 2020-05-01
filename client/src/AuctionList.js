import React, { useState, useEffect } from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import AuctionCard from './AuctionCard'
import withDrizzleContext from './withDrizzleContext'

function AuctionList (props) {
  const [keys, setKeys] = useState([])
  const [txStatus, setTxStatus] = useState('')

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
  }, [props.drizzleState])

  const { ItemShop } = props.drizzleState.contracts
  const rows = keys.map(function (key, index) {
    const valid = ItemShop.valid[key] ? ItemShop.valid[key].value : false
    if (!valid) return null
    console.log(index)
    return <AuctionCard key={index} id={index} setTxStatus={setTxStatus}/>
  })

  return (
    <>
      Transaction status: {txStatus}
      <CardColumns>
        {rows}
      </CardColumns>
    </>
  )
}

export default withDrizzleContext(AuctionList)
