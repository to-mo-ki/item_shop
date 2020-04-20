import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import BidButton from './BidButton';

class ItemList extends Component {

  render() {
    var valids = this.props.valids;
    var prices = this.props.prices;
    const rows = this.props.items.map(function (item, index) {
      if (!valids[index]) return null;
      var tokenId = item[0];
      var startPrice = item[1];
      var endPrice = item[2];
      var duration = item[3];
      var owner = item[4];
      var createdAt = item[5];
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
            price:{prices[index]}<br />
          </Card.Text>
          <BidButton index={index} price={prices[index]} />
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
        prices={props.prices}
      />
    )}
  </DrizzleContext.Consumer>
);
export default withContext;