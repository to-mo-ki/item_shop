import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

function ItemMetaData (props) {
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
    console.log(res, content)
    setName(content.name)
    setImage(content.image)
  }

  return <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Img src={image} />
  </Card.Body>
}

export default ItemMetaData
