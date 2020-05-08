import React from 'react'
import ItemTitleAndImage from './ItemTitleAndImage'
import ExhibitSelectButton from './ExhibitSelectButton'
import Card from 'react-bootstrap/Card'
import withDrizzleContext from './withDrizzleContext'

function MyItem (props) {
  return (<Card key={props.id} style={{ textAlign: 'center' }}>
    <Card.Body>
      <ItemTitleAndImage id={props.id}/>
      <ExhibitSelectButton id={props.id} selectFunc={props.selectFunc} isSelected={props.isSelected}/>
    </Card.Body>
  </Card>)
}

export default withDrizzleContext(MyItem)
