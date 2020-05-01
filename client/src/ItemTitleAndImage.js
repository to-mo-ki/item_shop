import React from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Card from 'react-bootstrap/Card'
import useTokenURI from './useTokenURI'
import useMetaData from './useMetaData'

function ItemTitleAndImage (props) {
  const URI = useTokenURI(props.id, props.drizzle, props.drizzleState)
  const { name, image } = useMetaData(URI)

  return <div>
    <Card.Title>{name}</Card.Title>
    <Card.Img src={image} style={{ margin: '10px' }}/>
  </div>
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemTitleAndImage
        drizzle={drizzle}
        drizzleState={drizzleState}
        id={props.id}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
