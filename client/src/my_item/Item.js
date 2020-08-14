import React from 'react'
import useCacheCall from '../common/useCacheCall'
import withDrizzleContext from '../common/withDrizzleContext'
import MyItem from './MyItem'

const getAccounts = async (web3) => {
  const accounts = await web3.eth.getAccounts()
  console.log(accounts)
}
function Item (props) {
  const owner = useCacheCall('ownerOf', props.id, props.drizzle, props.drizzleState)
  console.log(props.drizzleState)
  const account = props.drizzleState.accounts[0]
  getAccounts(props.drizzle.web3)
  console.log(owner, account, account !== owner)
  if (account !== owner) return null
  return <MyItem id={props.id} selectFunc={props.selectFunc} isSelected={props.isSelected} />
}

export default withDrizzleContext(Item)
