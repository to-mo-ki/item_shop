import React from "react";
import AddItem from './AddItem';
import WithdrawButton from './WithdrawButton';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <AddItem />
        <WithdrawButton />
      </div>
    );
  }
}
