import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

function ItemTitleAndImage (props) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    fetchNames(props.URI)
  }, [props.URI])

  const fetchNames = async (URI) => {
    if (URI === undefined || URI.length === 0) {
      return
    }
    const res = await fetch(URI)
    const content = await res.json()
    setName(content.name)
    setImage(content.image)
  }

  return <div>
    <Card.Title>{name}</Card.Title>
    <Card.Img src={image} />
  </div>
}

export default ItemTitleAndImage
