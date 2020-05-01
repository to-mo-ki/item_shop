import React from 'react'
import Card from 'react-bootstrap/Card'
import useTokenURI from './useTokenURI'
import useMetaData from './useMetaData'
import withDrizzleContext from './withDrizzleContext'

function ItemTitleAndImage (props) {
  const URI = useTokenURI(props.id, props.drizzle, props.drizzleState)
  const { name, image } = useMetaData(URI)

  return <div>
    <Card.Title>{name}</Card.Title>
    <Card.Img src={image} style={{ margin: '10px' }}/>
  </div>
}

export default withDrizzleContext(ItemTitleAndImage)
