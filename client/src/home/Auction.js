import React from 'react'
import useCacheCall from '../common/useCacheCall'
import ValidAuction from './ValidAuction'
import withDrizzleContext from '../common/withDrizzleContext'

function Auction (props) {
  const valid = useCacheCall('valid', props.id, props.drizzle, props.drizzleState)
  if (!valid) return null
  return <ValidAuction id={props.id} setTxStatus={props.setTxStatus}/>
}

export default withDrizzleContext(Auction)
