import React from 'react'
import ItemTitleAndImage from './ItemTitleAndImage'
import ExhibitSelectButton from './ExhibitSelectButton'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'

function ItemCard (props) {
  return (<Card key={props.id} style={{ textAlign: 'center' }}>
    <Card.Body>
      <ItemTitleAndImage id={props.id}/>
      <ExhibitSelectButton id={props.id} selectFunc={props.selectFunc} isSelected={props.isSelected}/>
    </Card.Body>
  </Card>)
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemCard
        drizzle={drizzle}
        drizzleState={drizzleState}
        id={props.id}
        selectFunc={props.selectFunc}
        isSelected={props.isSelected}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
