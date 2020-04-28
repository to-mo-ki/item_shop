import React, { Component, useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

function ItemCard (props) {
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

  const URI = props.URI
  const id = props.id
  console.log(props)
  return <Card key={id}>
    <Card.Body>
      <Card.Title>{id}</Card.Title>
      <Card.Text>{URI}, {name}</Card.Text>
      <Card.Img src={image} />
    </Card.Body>
  </Card>
}

export default ItemCard
