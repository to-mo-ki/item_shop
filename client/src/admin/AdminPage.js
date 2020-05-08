import React, { useState, useEffect } from 'react'
import AddItem from './AddItem'
import withDrizzleContext from '../common/withDrizzleContext'

function AdminPage (props) {
  const [owner, setOwner] = useState('')
  const [key, setKey] = useState('')
  const [account, setAccount] = useState(undefined)

  useEffect(() => {
    const contract = props.drizzle.contracts.ItemShop
    const key = contract.methods.owner.cacheCall()
    setKey(key)
  }, [props.drizzle])

  useEffect(() => {
    const contract = props.drizzleState.contracts.ItemShop
    const owner = contract.owner[key] ? contract.owner[key].value : undefined
    setOwner(owner)
  }, [key, props.drizzleState])

  useEffect(() => {
    setAccount(props.drizzleState.accounts[0])
  }, [props.drizzleState])

  useEffect(() => {
    if ((!owner) || (!account)) return
    if (owner !== account) alert('管理者ページは管理者しかアクセスできません')
  }, [account, owner])

  if (owner !== account) return null

  return (
    <div>
      <AddItem />
    </div>
  )
}

export default withDrizzleContext(AdminPage)
