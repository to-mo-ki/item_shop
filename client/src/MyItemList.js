import React, { Component } from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import ItemCard from './ItemCard'

class MyItemList extends Component {
  render () {
    const account = this.props.account
    const rows = this.props.itemToOwner.map(function (owner, index) {
      if (account !== owner) {
        return null
      }
      console.log(index)
      return <ItemCard key={index} id={index}/>
    })

    return (
      <CardColumns>
        {rows}
      </CardColumns>
    )
  }
}

export default MyItemList
