import React from 'react';

const Context = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.fetchItemKeys = async (contract) => {
      const length = await contract.methods.getItemCount().call();
      const dataKeys = [];
      for (let i = 0; i < length; i++) {
        dataKeys.push(contract.methods.items.cacheCall(i));
      }
      this.setState({
        ...this.state,
        dataKeys,
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
