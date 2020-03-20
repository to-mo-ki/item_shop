import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import PurchaseButton from './PurchaceButton';

class MyItemList extends Component {

  render() {
    const account = this.props.account;
    const rows = this.props.items.map(function (item, index) {
      if (account !== item.address) {
        return null;
      }
      return <Card key={index}>
        <Card.Body>
          <Card.Title>{item.price}</Card.Title>
          <Card.Text>description</Card.Text>
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
      <MyItemList
        drizzle={drizzle}
        drizzleState={drizzleState}
        items={props.items}
        account={props.account}
      />
    )}
  </DrizzleContext.Consumer>
);
export default withContext;