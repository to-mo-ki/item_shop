import React from 'react';
import { Route } from "react-router-dom";

import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Home from './Home';
import MyItem from './MyItem';
import AdminPage from './AdminPage';

function Main() {
  return (
    <Router>
      <Route exact path="/" component={Home} ></Route >
      <Route path="/my-item" component={MyItem} ></Route >
      <Route path="/admin" component={AdminPage} ></Route >
    </Router>
  );
}
export default Main;
