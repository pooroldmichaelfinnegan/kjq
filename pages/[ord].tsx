import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function DynamicRoute() {
  const router = useRouter()
  const { ord } = router.query
  const [ json, setJson ] = useState('')

  useEffect(() => {
    if (ord === undefined) return

    GTget(ord)
      .then(response => response.data) 
      .then(data => JSON.stringify(data))
      .then(json => setJson(json))
      // .then(log => console.log(log))

  }, [ ord ])

  return <div>{ json }</div>
}


const GTget = async (ord: string | string[]): Promise<T> => {
  const URL = `https://translate.googleapis.com/translate_a/single`
            + `?client=gtx`
            + `&dt=t`
            + `&dt=bd`
            + `&dj=1`
            + `&sl=da`
            + `&tl=en`
            + `&q=${ord}`

  const orddata = await axios.get(URL)
  
  return orddata
}
  