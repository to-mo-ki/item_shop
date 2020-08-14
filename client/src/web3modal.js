import Web3Modal from 'web3modal'
import Torus from '@toruslabs/torus-embed'

const providerOptions = {
  torus: {
    package: Torus, // required
    options: {
      networkParams: {
        host: 'https://localhost:8545'
      }
    }
  },
  authereum: {
    package: window.Authereum
  }
}

const web3Modal = new Web3Modal({
  theme: 'dark',
  network: process.env.REACT_APP_NETWORK_TYPE,
  cacheProvider: false,
  providerOptions
})

export default web3Modal
