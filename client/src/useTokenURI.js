import { useState, useEffect } from 'react'

function useTokenURI (id, drizzle, drizzleState) {
  const [URI, setURI] = useState('')
  const [key, setKey] = useState('')

  useEffect(() => {
    const contract = drizzle.contracts.ItemShop
    const key = contract.methods.tokenURI.cacheCall(id)
    setKey(key)
  }, [id])

  useEffect(() => {
    const contract = drizzleState.contracts.ItemShop
    const URI = contract.tokenURI[key] ? contract.tokenURI[key].value : undefined
    setURI(URI)
  }, [key, drizzleState])
  return URI
}

export default useTokenURI
