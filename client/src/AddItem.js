import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import ItemKeyContext from './ItemShopKey';
import ipfs from './ipfs';

class AddItem extends Component {
  state = { stackId: null };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.addItem(e.target.value);
    }
  };

  addItem = async (value) => {
    await this.uploadIpfs(value);

    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ItemShop;
    console.log(drizzleState.accounts);

    const stackId = contract.methods["mintItem"].cacheSend(value, {
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
    this.props.turnFetchStatus(true);
  };

  uploadIpfs = async (value) => {
    const content = JSON.stringify({
      name: value,
      description: "",
      image: ""
    });
    var result = [];
    for await (var res of ipfs.add(content)) {
      result.push(res);
    }
    const hash = await result[0].cid.string;
    console.log(hash);
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