import { useState, useEffect } from 'react'

function useOwner (drizzle, drizzleState) {
  const [owner, setOwner] = useState(undefined)
  const [key, setKey] = useState('')

  useEffect(() => {
    const contract = drizzle.contracts.ItemShop
    const key = contract.methods.owner.cacheCall()
    setKey(key)
  }, [drizzle])

  useEffect(() => {
    const contract = drizzleState.contracts.ItemShop
    const owner = contract.owner[key] ? contract.owner[key].value : undefined
    setOwner(owner)
  }, [key, drizzleState])
  return owner
}

export default useOwner
