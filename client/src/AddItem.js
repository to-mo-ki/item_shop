import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import ItemKeyContext from './ItemShopKey';
import uploadIpfs from './IpfsUploader';

class AddItem extends Component {
  state = { stackId: null, image: null };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.addItem(e.target.value);
    }
  };

  addItem = async (value) => {
    const tokenURI = await uploadIpfs(value, this.state.image);
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ItemShop;
    console.log(drizzleState.accounts);
    const stackId = contract.methods["mintItem"].cacheSend(tokenURI, {
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

  handleFiles = (e) => {
    const files = e.target.files;
    const reader = new window.FileReader();
    var buffer;
    reader.readAsArrayBuffer(files[0]);
    reader.onloadend = () => {
      const res = reader.result;
      buffer = Buffer.from(res);
      this.setState({ ...this.state, image: buffer });
    };
  }

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <input type="file" onChange={this.handleFiles} />
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