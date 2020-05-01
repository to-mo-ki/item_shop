import { useState, useEffect } from 'react'

function useCurrentPrice (id, drizzle, drizzleState) {
  const [price, setPrice] = useState(0)

  const updatePrice = async () => {
    const contract = drizzle.contracts.ItemShop
    const price = await contract.methods.getCurrentPriceById(id).call()
    setPrice(price)
  }

  useEffect(() => {
    const timerId = setInterval(() => updatePrice(), 1000)
    return () => { clearInterval(timerId) }
  }, [])

  const { isBN, fromWei } = drizzle.web3.utils
  if (isBN(price) || (typeof price === 'string')) {
    const currentWeiPrice = fromWei(price, 'ether')
    return currentWeiPrice
  }
  return 0
}

export default useCurrentPrice
