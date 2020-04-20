import React from 'react';
import { Container } from 'react-bootstrap';
import { DrizzleContext } from '@drizzle/react-plugin';

import './App.css';
import Main from './Main';
import Header from './Header';

const App = (initialized, drizzle) => {
  if (!initialized) return 'Loading...';
  drizzle.web3.eth.net.getNetworkType((err, networkType) => {
    if (networkType !== process.env.REACT_APP_NETWORK_TYPE) {
      alert("ネットワークを" + process.env.REACT_APP_NETWORK_TYPE + "に切り替えてください");
    }
  });
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ initialized, drizzle }) => App(initialized, drizzle)}
  </DrizzleContext.Consumer>
);
export default withContext;