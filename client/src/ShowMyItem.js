import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import ItemShopKeyContext from './ItemShopKey';
import MyItemList from './MyItemList';

class ShowMyItem extends Component {
  async componentDidMount() {
    await this.props.fetchItemKeys(this.props.drizzle.contracts.ItemShop);
  }

  render() {
    const { ItemShop } = this.props.drizzleState.contracts;
    const Items = this.props.myItemKeys.map(key =>
      ItemShop.getItem[key] ? ItemShop.getItem[key].value : []
    );
    const URIs = this.props.itemURIKeys.map(key =>
      ItemShop.tokenURI[key] ? ItemShop.tokenURI[key].value : []
    );
    return <MyItemList items={Items} URIs={URIs} account={this.props.drizzleState.accounts[0]} />;
  }
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemShopKeyContext.Consumer>
        {({ myItemKeys, fetchItemKeys, itemURIKeys }) => (
          <ShowMyItem
            drizzle={drizzle}
            drizzleState={drizzleState}
            myItemKeys={myItemKeys}
            itemURIKeys={itemURIKeys}
            fetchItemKeys={fetchItemKeys}
          />
        )}
      </ItemShopKeyContext.Consumer>
    )}
  </DrizzleContext.Consumer>
);
export default withContext;