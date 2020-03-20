import React from 'react';
import { Route } from "react-router-dom";

import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Home from './Home';
import MyItem from './MyItem';

function Main() {
  return (
    <Router>
      <Route exact path="/" component={Home} ></Route >
      <Route path="/my-item" component={MyItem} ></Route >
    </Router>
  );
}
export default Main;
