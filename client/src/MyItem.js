import React, { useState } from 'react'
import MyItemList from './MyItemList'
import ExhibitForm from './ExhibitForm'

function MyItem () {
  const [selectedId, setSelectedId] = useState(-1)

  const selectFunc = (id) => {
    setSelectedId(id)
    console.log(id)
  }
  return (
    <div>
      <ExhibitForm selectedId={selectedId}/>
      <MyItemList selectFunc={selectFunc} selectedId={selectedId}/>
    </div>
  )
}

export default MyItem
