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
  const [unit, setUnit] = useState('秒')

  const rate = () => {
    switch (unit) {
      case '秒':
        return 1
      case '分':
        return 60
      case '時間':
        return 60 * 60
      case '日':
        return 60 * 60 * 24
      default:
        break
    }
  }

  return (
    <Form>
      <Form.Row style={outerStyle}>
        <Form.Group style={innerStyle}>
          <Form.Label>開始価格（ETH)</Form.Label>
          <Form.Control type="number" onChange={(e) => setStartPrice(e.target.value)} />
        </Form.Group>
        <Form.Group style={innerStyle}>
          <Form.Label>終了価格（ETH）</Form.Label>
          <Form.Control type="number" onChange={(e) => setEndPrice(e.target.value)} />
        </Form.Group>
        <Form.Group style={innerStyle}>
          <Form.Label>期間</Form.Label>
          <Form.Control type="number" onChange={(e) => setDuration(e.target.value)} />
        </Form.Group>
        <Form.Group style={innerStyle}>
          <Form.Label>単位</Form.Label>
          <Form.Control as="select" style={innerStyle} onChange={(e) => setUnit(e.target.value)}>
            <option>秒</option>
            <option>分</option>
            <option>時間</option>
            <option>日</option>
          </Form.Control>
        </Form.Group>
        <ExhibitButton index={props.selectedId} startPrice={startPrice} endPrice={endPrice} duration={duration * rate()} />
      </Form.Row>
    </Form>
  )
}

export default ExhibitForm
