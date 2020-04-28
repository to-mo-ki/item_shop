import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
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
    const stackId = contract.methods["mintItem"].cacheSend(tokenURI, {
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
  };


  getTxStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];
    if (!txHash) return null;
    if (!transactions[txHash]) return null;
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
      <AddItem
        drizzle={drizzle}
        drizzleState={drizzleState}
      />
    )}
  </DrizzleContext.Consumer>
);
export default withContext;