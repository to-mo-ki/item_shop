import React, { useState, useCallback } from 'react'
import { Drizzle } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'
import web3Modal from './web3modal'
import { WalletContext } from './WalletContext'
import Web3 from 'web3'

export default function Web3Wrapper (props) {
  const web3 = new Web3(process.env.REACT_APP_INFURA_URL)
  const options = {
    web3: {
      customProvider: web3,
      fallback: {
        type: 'ws',
        url: process.env.REACT_APP_INFURA_URL
      }
    }
  }
  const initDrizzle = new Drizzle(options)
  const [drizzle, setDrizzle] = useState(initDrizzle)

  const connectWallet = useCallback(async () => {
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const options = {
      web3: {
        customProvider: web3,
        fallback: {
          type: 'ws',
          url: process.env.REACT_APP_INFURA_URL
        }
      }
    }
    const drizzle = new Drizzle(options)
    setDrizzle(drizzle)
  }, [])

  const disconnectWallet = useCallback(async () => {
    const web3 = drizzle.web3
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    await web3Modal.clearCachedProvider()
  }, [])

  return <DrizzleContext.Provider drizzle={drizzle}>
    <WalletContext.Provider connectWallet={connectWallet} disconnectWallet={disconnectWallet} >
      {props.children}
    </WalletContext.Provider>
  </DrizzleContext.Provider>
}
