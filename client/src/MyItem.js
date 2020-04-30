import React from 'react'
import MyItemList from './MyItemList'
import ExhibitForm from './ExhibitForm'

function MyItem () {
  const selectFunc = (id) => {
    console.log(id)
  }
  return (
    <div>
      <ExhibitForm />
      <MyItemList selectFunc={selectFunc}/>
    </div>
  )
}

export default MyItem
