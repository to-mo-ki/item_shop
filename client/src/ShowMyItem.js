import React, { Component } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import MyItemKeyContext from './MyItemKey'
import MyItemList from './MyItemList'

class ShowMyItem extends Component {
  async componentDidMount () {
    await this.props.fetchItemKeys(this.props.drizzle.contracts.ItemShop)
  }

  render () {
    const { ItemShop } = this.props.drizzleState.contracts
    const itemToOwner = this.props.itemToOwnerKeys.map(key =>
      ItemShop.ownerOf[key] ? ItemShop.ownerOf[key].value : []
    )
    return <MyItemList itemToOwner={itemToOwner} account={this.props.drizzleState.accounts[0]} />
  }
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <MyItemKeyContext.Consumer>
        {({ itemToOwnerKeys, fetchItemKeys }) => (
          <ShowMyItem
            drizzle={drizzle}
            drizzleState={drizzleState}
            itemToOwnerKeys={itemToOwnerKeys}
            fetchItemKeys={fetchItemKeys}
          />
        )}
      </MyItemKeyContext.Consumer>
    )}
  </DrizzleContext.Consumer>
)
export default withContext
