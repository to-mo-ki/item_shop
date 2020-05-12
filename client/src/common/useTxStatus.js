import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

function useTxStatus (eventName, stackId, drizzleState) {
  const [status, setStatus] = useState(undefined)

  useEffect(() => {
    const { transactions, transactionStack } = drizzleState
    const txHash = transactionStack[stackId]
    if (!transactions[txHash]) {
      setStatus(undefined)
    } else {
      setStatus(transactions[txHash].status)
    }
  }, [drizzleState.transactions, drizzleState.transactionStack, stackId])

  useEffect(() => {
    let display
    switch (status) {
      case 'pending':
        display = eventName + 'を試みています...'
        toast.info(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      case 'success':
        display = eventName + 'に成功しました'
        toast.success(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      case 'error':
        display = eventName + 'に失敗しました'
        toast.error(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      default:
        break
    }
  }, [status])
}

export default useTxStatus
