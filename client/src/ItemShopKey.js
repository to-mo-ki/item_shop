import React from 'react';

const Context = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.fetchItemKeys = async (contract) => {
      const length = await contract.methods.getAuctionCount().call();
      const dataKeys = [];
      const validKeys = [];
      for (let i = 0; i < length; i++) {
        dataKeys.push(contract.methods.valid.cacheCall(i));
        validKeys.push(contract.methods.getAuction.cacheCall(i));
      }
      const itemLength = await contract.methods.getItemCount().call();
      const myItemKeys = [];
      for (let i = 0; i < itemLength; i++) {
        myItemKeys.push(contract.methods.getItem.cacheCall(i));
      }

      this.setState({
        ...this.state,
        dataKeys,
        validKeys,
        myItemKeys
      });
    };

    this.turnFetchStatus = (newState) => {
      this.setState({
        ...this.state,
        isFetchingItem: newState,
      });
    }

    this.state = {
      dataKeys: [],
      validKeys: [],
      myItemKeys: [],
      fetchItemKeys: this.fetchItemKeys,
      isFetchingItem: false,
      turnFetchStatus: this.turnFetchStatus,
    };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default {
  Consumer: Context.Consumer,
  Provider
};
