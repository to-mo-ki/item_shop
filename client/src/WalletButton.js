import React, { useContext, useCallback } from 'react'
import withDrizzleContext from './common/withDrizzleContext'
import Button from 'react-bootstrap/Button'
import web3Modal from './web3modal'

function WalletButton (props) {
  const connect = useCallback(async () => {
    await web3Modal.connect()
    window.location.reload()
  }, [])

  const disconnect = useCallback(async () => {
    console.log(props.drizzle)
    console.log(web3Modal)
    const { web3 } = props.drizzle
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    web3Modal.clearCachedProvider()
    window.location.reload()
  }, [])
  if (props.drizzle.web3.currentProvider.constructor.name === 'WebsocketProvider') {
    return <Button onClick={connect}>connect</Button>
  } else {
    return <Button onClick={disconnect}>disconnect</Button>
  }
}

export default withDrizzleContext(WalletButton)
