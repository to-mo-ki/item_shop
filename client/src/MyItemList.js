import React, { Component } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import CardColumns from 'react-bootstrap/CardColumns'
import ItemCard from './ItemCard'
import ItemMetaURI from './ItemMetaURI'

class MyItemList extends Component {
  render () {
    const account = this.props.account
    const rows = this.props.itemToOwner.map(function (owner, index) {
      if (account !== owner) {
        return null
      }
      console.log(index)
      return <ItemMetaURI key={index} id={index}/>
    })

    return (
      <CardColumns>
        {rows}
      </CardColumns>
    )
  }
}

export default MyItemList
