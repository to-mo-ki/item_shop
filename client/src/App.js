import React from 'react';
import { Container } from 'react-bootstrap';
import { DrizzleContext } from 'drizzle-react';

import './App.css';
import Main from './Main';
import Header from './Header';

const App = initialized => {
  if (!initialized) return 'Loading...';
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ initialized }) => App(initialized)}
  </DrizzleContext.Consumer>
);
export default withContext;