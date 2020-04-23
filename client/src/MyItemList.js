import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import CardColumns from 'react-bootstrap/CardColumns';
import ItemCard from './ItemCard';

class MyItemList extends Component {

  render() {
    const account = this.props.account;
    const URIs = this.props.URIs;
    const rows = this.props.items.map(function (item, index) {
      if (account !== item[1]) {
        return null;
      }
      console.log(index);
      return <ItemCard id={index} URI={URIs[index]} />
    });

    return (
      <CardColumns>
        {rows}
      </CardColumns>
    );
  }
}

export default MyItemList;