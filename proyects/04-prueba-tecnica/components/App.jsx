import { useEffect, useState } from 'react'

const CAT_URL = 'https://catfact.ninja/fact'
const CAT_IMAGE_URL = 'https://cataas.com/cat/says/hello?json=true'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [image, setImage] = useState()

  useEffect(() => {
    fetch(CAT_URL)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setFact(data.fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return
    fetch(CAT_IMAGE_URL)
      .then(res => res.json())
      .then((response) => {
        console.log(response)
        setImage(response.url)
      })
  }, [fact])

  return (
    <>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {image && <img src={CAT_PREFIX_IMAGE_URL + image} alt='cat' />}
    </>
  )
}
