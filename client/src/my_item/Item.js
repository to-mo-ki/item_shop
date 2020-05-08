import React from 'react'
import useCacheCall from '../common/useCacheCall'
import withDrizzleContext from '../common/withDrizzleContext'
import MyItem from './MyItem'

function Item (props) {
  const owner = useCacheCall('ownerOf', props.id, props.drizzle, props.drizzleState)
  const account = props.drizzleState.accounts[0]
  if (account !== owner) return null
  return <MyItem id={props.id} selectFunc={props.selectFunc} isSelected={props.isSelected} />
}

export default withDrizzleContext(Item)
