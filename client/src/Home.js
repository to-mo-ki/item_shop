import React from "react";
import ShowItemShop from './ShowItemShop';
import AddItem from './AddItem';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <AddItem />
        <ShowItemShop />
      </div>
    );
  }
}
