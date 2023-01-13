import React, { useState, useEffect, useContext, createContext } from "react"

import { randomElement, setRandomElement } from "../tools"
import { getGT } from "../google_translate_stuff/gt"
import wordList from "../../google_drive_pomf/ords.json"

const sample = { "230113": { "værdi": "2",
                             "støtter": "1" }
               }

interface Date extends Object { ord: Object<string> }

const calcWordArrays = (obj: Object<Date>) => {
  const arr: string[][] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],]

  for (const date in obj) {
    for (const ord in obj[date]) {
      arr[obj[date][ord]].push(ord)
    }
  }

  console.log(arr)
}


export default function Home() {
  const [words, setWords] = useState<string[]>([])
  const [currentOrd, setCurrentOrd] = useState<[number, string]>([69, "sixtyNine"])
  const [answers, setAnswers] = useState<string[]>([])

  useEffect(() => {
    const translate = 
  }, currentOrd)

  const handleAdd = (ord) => {

  }
  const handleSub = () => {}

  return (
    <div className="bg-black text-white flex flex-col justify-center content-center">
      <button 
          className={``}
          onClick={() => handleAdd(currentOrd)}
        >+</button>
      <button
          className={``}
          onClick={() => handleSub()}
        >-</button>
      <div className="flex flex-col justify-center content-center min-w-full h-full text-center">
        <Card
          ord={ord}
        />
      </div>
    </div>
)}


function Card({ ord }) {
  return <div className={`flex flex-col height-[100%]`}>

  </div>
}


interface Answer {
  ord: string
  translation: string
}
