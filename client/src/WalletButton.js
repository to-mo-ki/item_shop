import React, { useCallback, useContext } from 'react'
import withDrizzleContext from './common/withDrizzleContext'
import Button from 'react-bootstrap/Button'
import web3Modal from './web3modal'
import Web3Context from './Web3Context'

function WalletButton (props) {
  const { isConnect } = useContext(Web3Context)
  const connect = useCallback(async () => {
    try {
      await web3Modal.connect()
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }, [])

  const disconnect = useCallback(async () => {
    const { web3 } = props.drizzle
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    await web3Modal.clearCachedProvider()
    window.location.reload()
  }, [])
  if (!props.drizzle.web3.currentProvider) {
    return null
  }
  if (isConnect) {
    return <Button onClick={disconnect}>disconnect</Button>
  } else {
    return <Button onClick={connect}>connect</Button>
  }
}

export default withDrizzleContext(WalletButton)
