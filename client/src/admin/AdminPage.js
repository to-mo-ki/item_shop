import React, { useState, useEffect } from 'react'
import AddItem from './AddItem'
import withDrizzleContext from '../common/withDrizzleContext'
import useOwner from './useOwner'

function AdminPage (props) {
  const [account, setAccount] = useState(undefined)
  const owner = useOwner(props.drizzle, props.drizzleState)

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
