import React, { Component } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import AuctionKeyContext from './AuctionKey'
import AuctionList from './AuctionList'

class ShowItemShop extends Component {
  async componentDidMount () {
    await this.props.fetchItemKeys(this.props.drizzle.contracts.ItemShop)
  }

  render () {
    const { ItemShop } = this.props.drizzleState.contracts
    const Items = this.props.dataKeys.map(key =>
      ItemShop.getAuction[key] ? ItemShop.getAuction[key].value : undefined
    )

    const valids = this.props.validKeys.map(key =>
      ItemShop.valid[key] ? ItemShop.valid[key].value : []
    )
    return <AuctionList items={Items} valids={valids} />
  }
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <AuctionKeyContext.Consumer>
        {({ dataKeys, validKeys, priceKeys, fetchItemKeys }) => (
          <ShowItemShop
            drizzle={drizzle}
            drizzleState={drizzleState}
            dataKeys={dataKeys}
            validKeys={validKeys}
            priceKeys={priceKeys}
            fetchItemKeys={fetchItemKeys}
          />
        )}
      </AuctionKeyContext.Consumer>
    )}
  </DrizzleContext.Consumer>
)
export default withContext
