import React from 'react'

const Context = React.createContext()

class Provider extends React.Component {
  constructor (props) {
    super(props)

    this.fetchItemKeys = async (contract) => {
      const itemLength = await contract.methods.getItemCount().call()
      const myItemKeys = []
      const itemURIKeys = []
      for (let i = 0; i < itemLength; i++) {
        myItemKeys.push(contract.methods.getItem.cacheCall(i))
        itemURIKeys.push(contract.methods.tokenURI.cacheCall(i))
      }

      this.setState({
        ...this.state,
        myItemKeys,
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
      myItemKeys: [],
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
