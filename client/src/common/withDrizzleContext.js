import React from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'

function withDrizzleContext (Component) {
  return function WithDrizzleContext (props) {
    return <DrizzleContext.Consumer>
      {({ drizzle, drizzleState }) => (
        <Component
          drizzle={drizzle}
          drizzleState={drizzleState}
          {...props}
        />
      )}
    </DrizzleContext.Consumer>
  }
}
export default withDrizzleContext
