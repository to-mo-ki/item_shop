import React, { useState } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
import uploadIpfs from './IpfsUploader'
import Button from 'react-bootstrap/Button'

function AddItem (props) {
  const [stackId, setStackId] = useState(null)
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)

  const addItem = async () => {
    const tokenURI = await uploadIpfs(name, image)
    const { drizzle, drizzleState } = props
    const contract = drizzle.contracts.ItemShop
    const stackId = contract.methods.mintItem.cacheSend(tokenURI, {
      from: drizzleState.accounts[0]
    })
    setStackId(stackId)
  }

  const getTxStatus = () => {
    const { transactions, transactionStack } = props.drizzleState
    const txHash = transactionStack[stackId]
    if (!transactions[txHash]) return null
    return transactions[txHash].status === 'success'
      ? 'Item追加に成功しました！'
      : 'Item追加中…'
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
      <div style={{ margin: '10px' }}>Status：{getTxStatus()}</div>
    </div >
  )
}

const withContext = () => (
  <DrizzleContext.Consumer>
    {({ drizzle, drizzleState }) => (
      <AddItem
        drizzle={drizzle}
        drizzleState={drizzleState}
      />
    )}
  </DrizzleContext.Consumer>
)
export default withContext
