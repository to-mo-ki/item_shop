import { useEffect } from 'react'
import { toast } from 'react-toastify'

function useTxStatus (eventName, stackId, drizzleState) {
  useEffect(() => {
    const { transactions, transactionStack } = drizzleState
    const txHash = transactionStack[stackId]
    console.log(txHash, transactions[txHash])
    if (!transactions[txHash]) return
    let display
    switch (transactions[txHash].status) {
      case 'pending':
        display = '入札を試みています...'
        toast.info(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      case 'success':
        display = '入札に成功しました'
        toast.success(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      case 'error':
        display = '入札に失敗しました'
        toast.error(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      default:
        break
    }
  }, [drizzleState.transactions, drizzleState.transactionStack])
}

export default useTxStatus
