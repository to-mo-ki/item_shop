import React from 'react'
import Button from 'react-bootstrap/Button'
import withDrizzleContext from '../common/withDrizzleContext'
import useCacheCall from '../common/useCacheCall'

function ExhibitSelectButton (props) {
  const exhibited = useCacheCall('itemIsExhibited', props.id, props.drizzle, props.drizzleState)

  if (exhibited) {
    return <Button variant="secondary" disabled>exhibited</Button>
  } else {
    if (props.isSelected) {
      return <Button variant="primary" disabled>selected</Button>
    } else {
      return <Button variant="primary" onClick={() => props.selectFunc(props.id)}>select</Button>
    }
  }
}

export default withDrizzleContext(ExhibitSelectButton)
