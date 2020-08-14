import React, { useState, useCallback, useEffect } from 'react'
import { Drizzle } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'
import web3Modal from './web3modal'
import WalletContext from './WalletContext'
import Web3 from 'web3'

export default function Web3Wrapper (props) {
  const [drizzle, setDrizzle] = useState(null)

  useEffect(async () => {
    if (web3Modal.cachedProvider) {
      const drizzle = createDrizzle(await web3Modal.connect())
      setDrizzle(drizzle)
    } else {
      const drizzle = createDrizzle(process.env.REACT_APP_INFURA_URL)
      setDrizzle(drizzle)
    }
  }, [props])

  const createDrizzle = (provider) => {
    const web3 = new Web3(provider)
    console.log(provider)
    const options = { web3: { customProvider: web3 } }
    return new Drizzle(options)
  }
  if (!drizzle) return <></>
  console.log(drizzle)
  return <DrizzleContext.Provider drizzle={drizzle}>
    {props.children}
  </DrizzleContext.Provider>
}
