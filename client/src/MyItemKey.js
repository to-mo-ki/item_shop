import React from 'react'

const Context = React.createContext()

class Provider extends React.Component {
  constructor (props) {
    super(props)

    this.fetchItemKeys = async (contract) => {
      const itemLength = await contract.methods.getItemCount().call()
      const itemToOwnerKeys = []
      for (let i = 0; i < itemLength; i++) {
        itemToOwnerKeys.push(contract.methods.ownerOf.cacheCall(i))
      }
      console.log(itemToOwnerKeys)
      this.setState({
        ...this.state,
        itemToOwnerKeys
      })
    }

    this.turnFetchStatus = (newState) => {
      this.setState({
        ...this.state,
        isFetchingItem: newState
      })
    }

    this.state = {
      itemToOwnerKeys: [],
      fetchItemKeys: this.fetchItemKeys,
      isFetchingItem: false,
      turnFetchStatus: this.turnFetchStatus
    }
  }

  render () {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default {
  Consumer: Context.Consumer,
  Provider
}
