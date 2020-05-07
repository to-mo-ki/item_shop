import React, { useState } from 'react'
import ExhibitButton from './ExhibitButton'
import Form from 'react-bootstrap/Form'

const innerStyle = {
  margin: '10px'
}

const outerStyle = {
  justifyContent: 'center',
  alignItems: 'center'
}

function ExhibitForm (props) {
  const [startPrice, setStartPrice] = useState(0)
  const [endPrice, setEndPrice] = useState(0)
  const [duration, setDuration] = useState(0)

  return (
    <Form>
      <Form.Row style={outerStyle}>
        <Form.Group style={innerStyle}>
          <Form.Label>startPrice</Form.Label>
          <Form.Control type="number" onChange={(e) => setStartPrice(e.target.value)} />
        </Form.Group>
        <Form.Group style={innerStyle}>
          <Form.Label>endPrice</Form.Label>
          <Form.Control type="number" onChange={(e) => setEndPrice(e.target.value)} />
        </Form.Group>
        <Form.Group style={innerStyle}>
          <Form.Label>duration</Form.Label>
          <Form.Control type="number" onChange={(e) => setDuration(e.target.value)} />
        </Form.Group>
        <ExhibitButton index={props.selectedId} startPrice={startPrice} endPrice={endPrice} duration={duration} />
      </Form.Row>
    </Form>
  )
}

export default ExhibitForm
