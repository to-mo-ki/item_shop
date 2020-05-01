import { useState, useEffect } from 'react'

function useAuction (id, drizzle, drizzleState) {
  const [data, setData] = useState('')
  const [key, setKey] = useState('')

  useEffect(() => {
    const contract = drizzle.contracts.ItemShop
    const key = contract.methods.getAuction.cacheCall(id)
    setKey(key)
  }, [id])

  useEffect(() => {
    const contract = drizzleState.contracts.ItemShop
    const data = contract.getAuction[key] ? contract.getAuction[key].value : undefined
    setData(data)
  }, [key, drizzleState])
  return data
}

export default useAuction
