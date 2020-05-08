import { useState, useEffect } from 'react'

function useCacheCall (methods, index, drizzle, drizzleState) {
  const [data, setData] = useState('')
  const [key, setKey] = useState('')

  useEffect(() => {
    const contract = drizzle.contracts.ItemShop
    const key = contract.methods[methods].cacheCall(index)
    setKey(key)
  }, [index])

  useEffect(() => {
    const contract = drizzleState.contracts.ItemShop
    const data = contract[methods][key] ? contract[methods][key].value : undefined
    setData(data)
  }, [key, drizzleState])
  return data
}

export default useCacheCall
