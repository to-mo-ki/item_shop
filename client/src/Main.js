import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css'

import Home from './Home'
import MyItemPage from './MyItemPage'
import AdminPage from './AdminPage'

function Main () {
  return (
    <Router>
      <Route exact path="/" component={Home} ></Route >
      <Route path="/my-item" component={MyItemPage} ></Route >
      <Route path="/admin" component={AdminPage} ></Route >
    </Router>
  )
}
export default Main
