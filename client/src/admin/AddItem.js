import React, { useState } from 'react'
import uploadIpfs from '../common/IpfsUploader'
import Button from 'react-bootstrap/Button'
import withDrizzleContext from '../common/withDrizzleContext'
import useTxStatus from '../common/useTxStatus'

function AddItem (props) {
  const [stackId, setStackId] = useState(null)
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)

  useTxStatus('アイテムの追加', stackId, props.drizzleState)

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
