import React from 'react'
import './App.css'
import Main from './Main'
import Header from './Header'
import LoadingContainer from './LoadingContainer'
import { Container } from 'react-bootstrap'

function App (props) {
  return (
    <Container>
      <Header />
      <LoadingContainer>
        <Main />
      </LoadingContainer>
    </Container>
  )
}

export default App
