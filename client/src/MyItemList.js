import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

class MyItemList extends Component {

  render() {
    const account = this.props.account;
    const rows = this.props.items.map(function (item, index) {
      if (account !== item[1]) {
        return null;
      }
      return <Card key={index}>
        <Card.Body>
          <Card.Title>{index}</Card.Title>
          <Card.Text>description</Card.Text>
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