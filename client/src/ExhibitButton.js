import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import Button from 'react-bootstrap/Button';

class ExhibitButton extends Component {
  state = { stackId: null };

  constructor(props) {
    super(props);
    this.onClick = (index, startPrice, endPrice, duration) => {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.ItemShop;
      const startWeiPrice = drizzle.web3.utils.toWei(startPrice, "ether");
      const endWeiPrice = drizzle.web3.utils.toWei(endPrice, "ether");
      const stackId = contract.methods.exhibit.cacheSend(index, startWeiPrice, endWeiPrice, duration, {
        from: drizzleState.accounts[0],
      });
      this.setState({ stackId });
    };
  }

  getTxStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];
    if (!txHash) return null;
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    var { index, startPrice, endPrice, duration } = this.props;
    var button = <Button variant="primary" onClick={() => this.onClick(index, startPrice, endPrice, duration)}>Exihibit</Button>;
    return (<div>
      {button}
      {this.getTxStatus()}
    </div>);
  }
}

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ExhibitButton
        drizzle={drizzle}
        drizzleState={drizzleState}
        index={props.index}
        startPrice={props.startPrice}
        endPrice={props.endPrice}
        duration={props.duration}
      />
    )}
  </DrizzleContext.Consumer>
);
export default withContext;