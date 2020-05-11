import React, { useState, useEffect } from 'react'
import uploadIpfs from '../common/IpfsUploader'
import Button from 'react-bootstrap/Button'
import withDrizzleContext from '../common/withDrizzleContext'
import { toast } from 'react-toastify'

function AddItem (props) {
  const [stackId, setStackId] = useState(null)
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    const { transactions, transactionStack } = props.drizzleState
    const txHash = transactionStack[stackId]
    console.log(txHash, transactions[txHash])
    if (!transactions[txHash]) return
    let display
    switch (transactions[txHash].status) {
      case 'pending':
        display = 'Item追加を試みています...'
        toast.info(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      case 'success':
        display = 'Item追加に成功しました'
        toast.success(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      case 'error':
        display = 'Item追加に失敗しました'
        toast.error(display, { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true })
        break
      default:
        break
    }
  }, [props.drizzleState.transactions, props.drizzleState.transactionStack])

  const addItem = async () => {
    const tokenURI = await uploadIpfs(name, image)
    const { drizzle, drizzleState } = props
    const contract = drizzle.contracts.ItemShop
    const stackId = contract.methods.mintItem.cacheSend(tokenURI, {
      from: drizzleState.accounts[0]
    })
    setStackId(stackId)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleFiles = (e) => {
    const files = e.target.files
    const reader = new window.FileReader()
    var buffer
    reader.readAsArrayBuffer(files[0])
    reader.onloadend = () => {
      const res = reader.result
      buffer = Buffer.from(res)
      setImage(buffer)
    }
  }

  return (
    <div>
      <div style={{ margin: '10px' }}>アイテム追加<br /></div>
      <div style={{ margin: '10px' }}>名前：<input type="text" onChange={handleName}/><br /></div>
      <div style={{ margin: '10px' }}>画像：<input type="file" onChange={handleFiles} /><br /></div>
      <Button style={{ margin: '10px' }} onClick={addItem}>追加</Button>
    </div >
  )
}

export default withDrizzleContext(AddItem)
