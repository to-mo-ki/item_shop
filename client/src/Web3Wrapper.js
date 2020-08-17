import React, { useState, useEffect } from 'react'
import { Drizzle } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'
import web3Modal from './web3modal'
import Web3 from 'web3'

export default function Web3Wrapper (props) {
  const [drizzle, setDrizzle] = useState(null)

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
        return process.env.REACT_APP_INFURA_URL
      }
    } else {
      return process.env.REACT_APP_INFURA_URL
    }
  }

  const createDrizzle = async () => {
    const provider = await getProvider()
    const web3 = new Web3(provider)
    const options = { web3: { customProvider: web3 } }
    setDrizzle(new Drizzle(options))
  }

  if (!drizzle) return <></>
  return <DrizzleContext.Provider drizzle={drizzle}>
    {props.children}
  </DrizzleContext.Provider>
}
