import React, { useState, useCallback, useEffect } from 'react'
import { Drizzle } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'
import web3Modal from './web3modal'
import WalletContext from './WalletContext'
import Web3 from 'web3'

export default function Web3Wrapper (props) {
  const [drizzle, setDrizzle] = useState(null)

  useEffect(() => {
    createDrizzle()
  }, [props])

  const getProvider = async () => {
    if (web3Modal.cachedProvider) {
      return (await web3Modal.connect())
    } else {
      return process.env.REACT_APP_INFURA_URL
    }
  }

  const createDrizzle = async () => {
    const provider = await getProvider()
    const web3 = new Web3(provider)
    console.log(provider)
    const options = { web3: { customProvider: web3 } }
    setDrizzle(new Drizzle(options))
  }

  if (!drizzle) return <></>
  return <DrizzleContext.Provider drizzle={drizzle}>
    {props.children}
  </DrizzleContext.Provider>
}
