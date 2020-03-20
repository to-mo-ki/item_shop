import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';
import Button from 'react-bootstrap/Button';

class PurchaseButton extends Component {
  state = { stackId: null };

  constructor(props) {
    super(props);
    this.onClick = (index, price) => {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.ItemShop;
      console.log(index, price);
      const stackId = contract.methods.buy(index).send({
        value: price,
        from: drizzleState.accounts[0],
      });
      this.setState({ stackId });
      //this.props.turnFetchStatus(true);
    };
  }

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;
    //console.log(transactions);
    //console.log(transactionStack);
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];
    //console.log(txHash);
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    var button;
    var item = this.props.item;
    var index = this.props.index;
    if (item.sold) {
      button = <Button variant="primary" disabled>sold out</Button>;
    } else {
      button = <Button variant="primary" onClick={() => this.onClick(index, item.price)}>buy</Button>;
    }
    return (<div>
      {button}
      {this.getTxStatus()}
    </div>);
  }
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <PurchaseButton
        drizzle={drizzle}
        drizzleState={drizzleState}
        item={props.item}
        index={props.index}
      />
    )}
  </DrizzleContext.Consumer>
);
export default withContext;