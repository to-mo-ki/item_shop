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
    if (typeof (content.name) === 'string') {
      setName(content.name)
    }
    if (typeof (content.image) === 'string') {
      setImage(content.image)
    }
    console.log(content)
  }

  return { name, image }
}

export default useMetaData
