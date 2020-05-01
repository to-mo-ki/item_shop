import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import withDrizzleContext from './withDrizzleContext';

class WithdrawButton extends Component {
  state = { stackId: null };

  constructor(props) {
    super(props);
    this.onClick = () => {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.ItemShop;
      const stackId = contract.methods.withdrawPayments.cacheSend({
        from: drizzleState.accounts[0],
      });
      this.setState({ stackId });
      //this.props.turnFetchStatus(true);
    };
  }

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    var button = <Button variant="primary" onClick={() => this.onClick()}>Withdraw</Button>;
    return (<div>
      {button}
      {this.getTxStatus()}
    </div>);
  }
}

export default withDrizzleContext(WithdrawButton)