import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';
import ItemKeyContext from './ItemShopKey';

class AddItem extends Component {
  state = { stackId: null };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.addItem(e.target.value);
    }
  };

  addItem = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ItemShop;
    const stackId = contract.methods.mintItem.cacheSend(value, {
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
    this.props.turnFetchStatus(true);
  };

  getTxStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];
    if (!txHash) return null;
    if (!transactions[txHash]) return null;
    if (
      transactions[txHash].status === 'success' &&
      this.props.isFetchingItem
    ) {
      this.props.turnFetchStatus(false);
      this.props.fetchItemKeys(this.props.drizzle.contracts.ItemShop);
    }
    return transactions[txHash].status === 'success'
      ? 'Item追加に成功しました！'
      : 'Item追加中…';
  };

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
      </div >
    );
  }
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemKeyContext.Consumer>
        {({ fetchItemKeys, isFetchingItem, turnFetchStatus }) => (
          <AddItem
            drizzle={drizzle}
            drizzleState={drizzleState}
            fetchItemKeys={fetchItemKeys}
            isFetchingItem={isFetchingItem}
            turnFetchStatus={turnFetchStatus}
          />
        )}
      </ItemKeyContext.Consumer>
    )}
  </DrizzleContext.Consumer>
);
export default withContext;