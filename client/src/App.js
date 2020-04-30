import React from 'react'
import './App.css'
import Main from './Main'
import Header from './Header'
import LoadingContainer from './LoadingContainer'
import { Container } from 'react-bootstrap'

function App (props) {
  return (
    <LoadingContainer>
      <Container>
        <Header />
        <Main />
      </Container>
    </LoadingContainer>
  )
}

export default App
