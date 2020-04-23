import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class ItemCard extends Component {

  state = { name: '' };

  fetchNames = async (URI) => {
    if (URI === undefined || URI.length === 0) {
      return;
    }
    const json = await fetch(URI);
    var name = (await json.json()).name;
    if (name !== this.state.name) { //無理やり
      this.setState({ name });
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
      </Card.Body>
    </Card>
  }
}

export default ItemCard;