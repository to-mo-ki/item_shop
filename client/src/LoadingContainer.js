import ItemShop from './contracts/ItemShop.json'
import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'

function LoadingContainer (props) {
  const [network, setNetwork] = useState(undefined)
  const [contract, setContract] = useState(false)

  useEffect(() => {
    if (props.initialized && props.drizzle && props.drizzle.web3 && props.drizzle.web3.eth) {
      fetchNetwork(props.drizzle)
    }
  }, [props.initialized, props.drizzle])

  const fetchNetwork = async (drizzle) => {
    const network = await drizzle.web3.eth.net.getNetworkType()
    setNetwork(network)
  }

  useEffect(() => {
    if (network !== process.env.REACT_APP_NETWORK_TYPE) return
    drizzle.addContract(ItemShop)
  }, [network])

  const drizzle = props.drizzle
  if (!props.initialized) return 'Loading...'
  if (!network) return 'Network checking...'
  if (network !== process.env.REACT_APP_NETWORK_TYPE) {
    return (
      <div style={{ margin: '30px', fontSize: '30px' }}>Wrong network!<br />
      Change {process.env.REACT_APP_NETWORK_TYPE}  network.</div>
    )
  }

  if (!props.drizzleState.contracts.ItemShop) return 'Contract adding...'
  return <div>{props.children}</div>
}

const withContext = (props) => (
  <DrizzleContext.Consumer>
    {({ initialized, drizzle, drizzleState }) => (
      <LoadingContainer drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}>
        {props.children}
      </LoadingContainer>
    )}
  </DrizzleContext.Consumer>
)
export default withContext
