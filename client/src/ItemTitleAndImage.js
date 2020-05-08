import React from 'react'
import Card from 'react-bootstrap/Card'
import useCacheCall from './useCacheCall'
import useMetaData from './useMetaData'
import withDrizzleContext from './withDrizzleContext'

function ItemTitleAndImage (props) {
  const URI = useCacheCall('tokenURI', props.id, props.drizzle, props.drizzleState)
  const { name, image } = useMetaData(URI)

  return <div>
    <Card.Title>{name}</Card.Title>
    <Card.Img src={image} style={{ margin: '10px' }}/>
  </div>
}

export default withDrizzleContext(ItemTitleAndImage)
