import { useState, useEffect } from 'react'

function useMetaData (URI) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    fetchNames(URI)
  }, [URI])

  const fetchNames = async (URI) => {
    if (URI === undefined || URI.length === 0) {
      return
    }
    const res = await fetch(URI)
    const content = await res.json()
    setName(content.name)
    setImage(content.image)
  }

  return { name, image }
}

export default useMetaData
