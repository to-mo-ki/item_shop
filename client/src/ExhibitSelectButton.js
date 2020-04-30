import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Button from 'react-bootstrap/Button'

function ExhibitSelectButton (props) {
  const [exhibited, setExhibited] = useState(false)
  const [key, setKey] = useState('')

  useEffect(() => {
    const contract = props.drizzle.contracts.ItemShop
    const key = contract.methods.itemIsExhibited.cacheCall(props.id)
    setKey(key)
  }, [props.id])

  useEffect(() => {
    const contract = props.drizzleState.contracts.ItemShop
    const exhibited = contract.itemIsExhibited[key] ? contract.itemIsExhibited[key].value : false
    setExhibited(exhibited)
  }, [key, props.drizzleState])
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

const withContext = props => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <ExhibitSelectButton
        drizzle={drizzle}
        drizzleState={drizzleState}
        id={props.id}
        selectFunc={props.selectFunc}
        isSelected={props.isSelected}
      />
    )}
  </DrizzleContext.Consumer>
)

export default withContext
