import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import PurchaseButton from './PurchaceButton';

class ItemList extends Component {

  render() {
    const rows = this.props.items.map(function (item, index) {
      var price = item[0];
      return <Card key={index}>
        <Card.Body>
          <Card.Title>{index}</Card.Title>
          <Card.Text>price:{price}</Card.Text>
          <PurchaseButton index={index} item={item} />
        </Card.Body>
      </Card>
    });

    return (
      <CardColumns>
        {rows}
      </CardColumns>
    );
  }
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemList
        drizzle={drizzle}
        drizzleState={drizzleState}
        items={props.items}
      />
    )}
  </DrizzleContext.Consumer>
);
export default withContext;