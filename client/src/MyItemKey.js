import React from 'react'

const Context = React.createContext()

class Provider extends React.Component {
  constructor (props) {
    super(props)

    this.fetchItemKeys = async (contract) => {
      const itemLength = await contract.methods.getItemCount().call()
      const itemToOwnerKeys = []
      const itemURIKeys = []
      for (let i = 0; i < itemLength; i++) {
        itemToOwnerKeys.push(contract.methods.ownerOf.cacheCall(i))
        itemURIKeys.push(contract.methods.tokenURI.cacheCall(i))
      }
      console.log(itemToOwnerKeys)
      this.setState({
        ...this.state,
        itemToOwnerKeys,
        itemURIKeys
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
      itemURIKeys: [],
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
