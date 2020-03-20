import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';
import ItemShopKeyContext from './ItemShopKey';
import ItemList from './ItemList';

class ShowItemShop extends Component {
  async componentDidMount() {
    await this.props.fetchItemKeys(this.props.drizzle.contracts.ItemShop);
  }

  render() {
    const { ItemShop } = this.props.drizzleState.contracts;
    const Items = this.props.dataKeys.map(key =>
      ItemShop.items[key] ? ItemShop.items[key].value : []
    );
    console.log(Items);
    console.log(ItemShop.getItemCount);
    return <ItemList items={Items} />;
  }
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemShopKeyContext.Consumer>
        {({ dataKeys, fetchItemKeys }) => (
          <ShowItemShop
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