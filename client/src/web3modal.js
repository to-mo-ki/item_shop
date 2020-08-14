import Web3Modal from 'web3modal'
import Torus from '@toruslabs/torus-embed'
import Fortmatic from 'fortmatic'

const providerOptions = {
  torus: {
    package: Torus, // required
    options: {
      networkParams: {
        host: 'https://localhost:8545'
      }
    }
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: process.env.REACT_APP_FORTMATIC_KEY
    }
  }
}

const web3Modal = new Web3Modal({
  theme: 'dark',
  network: process.env.REACT_APP_NETWORK_TYPE,
  cacheProvider: true,
  providerOptions
})

export default web3Modal
