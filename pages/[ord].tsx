import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

import { getGT } from "../google_translate_stuff/gt"

export default function DynamicRoute() {
  const router = useRouter()
  const { ord } = router.query
  const [ json, setJson ] = useState('')

  useEffect(() => {
    if (ord === undefined) return

    getGT(ord)
      .then(response => response.data) 
      .then(data => JSON.stringify(data))
      .then(json => setJson(json))
      // .then(log => console.log(log))

  }, [ ord ])

  return <div>{ json }</div>
}
