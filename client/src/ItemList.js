import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import PurchaseButton from './PurchaceButton';

class ItemList extends Component {

  render() {
    var valids = this.props.valids;
    const rows = this.props.items.map(function (item, index) {
      var tokenId = item[0];
      var startPrice = item[1];
      var endPrice = item[2];
      var duration = item[3];
      var owner = item[4];
      var createdAt = item[5];
      var valid = valids[index]
      if (!valid) return null;
      return <Card key={index}>
        <Card.Body>
          <Card.Title>{index}</Card.Title>
          <Card.Text>
            tokenID:{tokenId}<br />
            startPrice:{startPrice}<br />
            endPrice:{endPrice}<br />
            duration:{duration}<br />
            owner:{owner}<br />
            createdAt:{createdAt}<br />
          </Card.Text>
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
        valids={props.valids}
      />
    )}
  </DrizzleContext.Consumer>
);
export default withContext;