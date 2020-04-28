import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'

function CurrentPrice (props) {
  const [price, setPrice] = useState(0)

  const updatePrice = async () => {
    const contract = props.drizzle.contracts.ItemShop
    const price = await contract.methods.getCurrentPriceById(props.id).call()
    setPrice(price)
  }

  useEffect(() => {
    const timerId = setInterval(() => updatePrice(), 1000)
    return () => { clearInterval(timerId) }
  }, [])

  const { isBN, fromWei } = props.drizzle.web3.utils
  console.log(price)
  if (isBN(price) || (typeof price === 'string')) {
    const currentWeiPrice = fromWei(price, 'ether')
    return <>{currentWeiPrice}</>
  }
  return null
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <CurrentPrice
        drizzle={drizzle}
        drizzleState={drizzleState}
        id={props.id}
        setPrice={props.setPrice}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
