import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';
import ItemShopKeyContext from './ItemShopKey';
import MyItemList from './MyItemList';

class ShowMyItem extends Component {
  async componentDidMount() {
    await this.props.fetchItemKeys(this.props.drizzle.contracts.ItemShop);
  }

  render() {
    const { ItemShop } = this.props.drizzleState.contracts;
    const Items = this.props.dataKeys.map(key =>
      ItemShop.getItem[key] ? ItemShop.getItem[key].value : []
    );
    return <MyItemList items={Items} account={this.props.drizzleState.accounts[0]} />;
  }
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemShopKeyContext.Consumer>
        {({ dataKeys, fetchItemKeys }) => (
          <ShowMyItem
            drizzle={drizzle}
            drizzleState={drizzleState}
            dataKeys={dataKeys}
            fetchItemKeys={fetchItemKeys}
          />
        )}
      </ItemShopKeyContext.Consumer>
    )}
  </DrizzleContext.Consumer>
);
export default withContext;