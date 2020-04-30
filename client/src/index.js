import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { Drizzle, generateStore } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'

const options = {
  web3: {
    fallback: {
      type: 'ws',
      url: process.env.REACT_APP_INFURA_URL
    }
  }
}

const drizzleStore = generateStore(options)
const drizzle = new Drizzle(options, drizzleStore)

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <App />
  </DrizzleContext.Provider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
