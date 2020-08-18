import Web3Modal from 'web3modal'
import Torus from '@toruslabs/torus-embed'
import Fortmatic from 'fortmatic'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Portis from '@portis/web3'

const providerOptions = {
  torus: {
    package: Torus, // required
    options: {
      networkParams: {
        host: process.env.REACT_APP_ENDPOINT_HTTP_URL
      }
    }
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID
    }
  },
  portis: {
    package: Portis,
    options: {
      id: process.env.REACT_APP_PORTIS_ID
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
