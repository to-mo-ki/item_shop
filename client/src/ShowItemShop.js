import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import ItemShopKeyContext from './ItemShopKey';
import ItemList from './ItemList';

class ShowItemShop extends Component {
  async componentDidMount() {
    await this.props.fetchItemKeys(this.props.drizzle.contracts.ItemShop);
  }

  render() {
    const { ItemShop } = this.props.drizzleState.contracts;
    const Items = this.props.dataKeys.map(key =>
      ItemShop.getAuction[key] ? ItemShop.getAuction[key].value : []
    );

    const valids = this.props.validKeys.map(key =>
      ItemShop.valid[key] ? ItemShop.valid[key].value : []
    );
    return <ItemList items={Items} valids={valids} />;
  }
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ItemShopKeyContext.Consumer>
        {({ dataKeys, validKeys, fetchItemKeys }) => (
          <ShowItemShop
            drizzle={drizzle}
            drizzleState={drizzleState}
            dataKeys={dataKeys}
            validKeys={validKeys}
            fetchItemKeys={fetchItemKeys}
          />
        )}
      </ItemShopKeyContext.Consumer>
    )}
  </DrizzleContext.Consumer>
);
export default withContext;