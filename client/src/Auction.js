import React from 'react'
import useCacheCall from './useCacheCall'
import MyAuction from './MyAuction'
import withDrizzleContext from './withDrizzleContext'

function Auction (props) {
  const valid = useCacheCall('valid', props.id, props.drizzle, props.drizzleState)
  if (!valid) return null
  return <MyAuction id={props.id} setTxStatus={props.setTxStatus}/>
}

export default withDrizzleContext(Auction)
