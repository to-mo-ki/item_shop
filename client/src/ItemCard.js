import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class ItemCard extends Component {

  state = { name: '', image: '' };

  fetchNames = async (URI) => {
    if (URI === undefined || URI.length === 0) {
      return;
    }
    const res = await fetch(URI);
    const content = await res.json()
    console.log(content);
    if (content.name !== this.state.name) { //無理やり
      this.setState({ name: content.name, image: content.image });
    }
  }

  render() {
    const URI = this.props.URI;
    const id = this.props.id;
    console.log(this.props);
    this.fetchNames(URI);
    return <Card key={id}>
      <Card.Body>
        <Card.Title>{id}</Card.Title>
        <Card.Text>{URI}, {this.state.name}</Card.Text>
        <Card.Img src={this.state.image} />
      </Card.Body>
    </Card>
  }
}

export default ItemCard;