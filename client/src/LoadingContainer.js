import ItemShop from './contracts/ItemShop.json'
import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'

function LoadingContainer (props) {
  const [network, setNetwork] = useState('')

  useEffect(() => {
    if (props.initialized) {
      fetchNetwork(props.drizzle)
    }
  }, [props.initialized])

  const fetchNetwork = async (drizzle) => {
    const network = await drizzle.web3.eth.net.getNetworkType()
    setNetwork(network)
  }

  const drizzle = props.drizzle
  if (!props.initialized) return 'Loading...'
  if (network === '') return 'Network checking...'
  if (network !== process.env.REACT_APP_NETWORK_TYPE) {
    alert('ネットワークを' + process.env.REACT_APP_NETWORK_TYPE + 'に切り替えてください')
  }
  if (drizzle.contracts.ItemShop) {
    console.log('exist item shop')
    return <div>{props.children}</div>
  }
  drizzle.addContract(ItemShop)
  console.log('add item shop')
  return <div>{props.children}</div>
}

const withContext = (props) => (
  <DrizzleContext.Consumer>
    {({ initialized, drizzle }) => (
      <LoadingContainer drizzle={drizzle} initialized={initialized}>
        {props.children}
      </LoadingContainer>
    )}
  </DrizzleContext.Consumer>
)
export default withContext
