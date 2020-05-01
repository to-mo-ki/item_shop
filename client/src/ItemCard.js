import React, { useEffect, useState } from 'react'
import ItemTitleAndImage from './ItemTitleAndImage'
import ExhibitSelectButton from './ExhibitSelectButton'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'
import useTokenURI from './useTokenURI'

function ItemCard (props) {
  const URI = useTokenURI(props.id, props.drizzle, props.drizzleState)
  return (<Card key={props.id} style={{ textAlign: 'center' }}>
    <Card.Body>
      <ItemTitleAndImage URI={URI}/>
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
