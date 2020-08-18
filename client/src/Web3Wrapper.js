import React, { useState, useEffect } from 'react'
import { Drizzle } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'
import web3Modal from './web3modal'
import Web3 from 'web3'
import Web3Context from './Web3Context'

export default function Web3Wrapper (props) {
  const [drizzle, setDrizzle] = useState(null)
  const [isConnect, setIsConnect] = useState(false)
  useEffect(() => {
    createDrizzle()
  }, [props])

  const getProvider = async () => {
    if (web3Modal.cachedProvider) {
      try {
        return await web3Modal.connect()
      } catch (e) {
        alert('providerへの接続中にエラーが発生しました')
        console.log(e)
        return process.env.REACT_APP_ENDPOINT_WSS_URL
      }
    } else {
      return process.env.REACT_APP_ENDPOINT_WSS_URL
    }
  }

  const createDrizzle = async () => {
    const provider = await getProvider()
    const web3 = new Web3(provider)
    const options = { web3: { customProvider: web3 } }
    setDrizzle(new Drizzle(options))
    if (provider !== process.env.REACT_APP_ENDPOINT_WSS_URL) {
      setIsConnect(true)
    }
  }

  if (!drizzle) return <></>
  return <DrizzleContext.Provider drizzle={drizzle}>
    <Web3Context.Provider value={{ isConnect }}>
      {props.children}
    </Web3Context.Provider>
  </DrizzleContext.Provider>
}
