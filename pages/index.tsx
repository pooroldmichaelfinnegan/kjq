import React, { useState, useEffect, useRef } from "react"
import axios from 'axios'

import { randomElement, setRandomElement, date_YYMMDD_hhmmss } from "../tools"
import { getGT, parseData, T } from "../google_translate_stuff/gt"
import wordList from "../../google_drive_pomf/str_ords.json"


const sampleWords = ["220101 3 A", "220109 4 B", "220102 7 C", "220101 10 D"]
const today = date_YYMMDD_hhmmss()

const ARRAY = wordList
// const ARRAY = wordList.slice(-20)
const BACKUP = ARRAY


type dcw = [string, number, string]
const str2dcw = (str: string): dcw => {
  const date: string = str.slice(0,6)
  const count: number = parseInt(str.slice(7,8))
  const word: string = str.slice(9)

  return [date, count, word]
}

const dcw2str = (dcw: dcw): string => {
  const [date, count, word] = dcw

  return `${date} ${count} ${word}`
}


const getDates = (obj: string[]): {} => {
  const arr = {}
  
  for (const str of obj) {
    const [date, _, __]: dcw = str2dcw(str)
  
    arr[date] = 0
  }
  return arr
}
// const allDates = getDates(ARRAY)



const calcWordArray = (obj: string[], dates) => {
  let arr: string[] = []

  for (const str of obj) {
    const [date, count, word]: dcw = str2dcw(str)

    // console.log(' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ')
    // console.log(' >>> calc dates > ', dates)
    // console.log(' >>> calc dates[date] > ', dates[date])
    // console.log(' >>> calc string > ', str)

    if (dates[date] == 0) continue
    if (0 > count || count > 4) continue
    arr = [ ...arr, str ]
  }
  return arr
}


export default function Home() {
  const [currentOrd, setCurrentOrd] = useState('230112 4 default')
  const [dateToggles, setDateToggles] = useState(getDates(ARRAY))
  const [DCWs, setDCWs] = useState(ARRAY)
  const [wordArray, setWordArray] = useState(calcWordArray(ARRAY, dateToggles))
  const [translation, setTranslation] = useState<T>()
  const rerenders: {current: number} = useRef(0)

  const [manualRender, setManualRender] = useState(0)

  // useEffect(() => {
  //   if (currentOrd === undefined || currentOrd === '') {
  //     setRandomElement(setCurrentOrd, DCWs)
  //   }
  // })

  useEffect(() => {
    rerenders.current += 1
  })

  useEffect(() => {
    if (currentOrd === undefined) return

    const [_, __, word] = str2dcw(currentOrd)

    getGT(word)
      .then(response => response.data) 
      // .then(log => console.log(log))
      .then(data => parseData(data))
      .then(t => setTranslation(t))

  }, [currentOrd])

  const handleNewOrd = (): void => {
    const wa = calcWordArray(ARRAY, dateToggles)
    setWordArray(wa)
    // let word_array = calcWordArray(DCWs, dateToggles)

    if (!wordArray.length) setRandomElement(setCurrentOrd, [['230112', 'default']])
    else setRandomElement(setCurrentOrd, wordArray)
    // setCurrentOrd(DCWs[rerenders.current])
  }

  const handleAdd = (): void => {
    const _currentOrd = currentOrd
    const backup = DCWs
    const index: number = backup.indexOf(_currentOrd)

    let [date, count, word]: dcw = str2dcw(_currentOrd)

    if (count => 4) return
    count += 1

    const newDcw: dcw = [date, count, word]
    backup[index] = dcw2str(newDcw)
    setDCWs(backup)
  }

  const handleSub = (): void => {
    const _currentOrd = currentOrd
    const backup = DCWs
    const index: number = DCWs.indexOf(_currentOrd)

    let [date, count, word]: dcw = str2dcw(_currentOrd)

    if (count <= 0) return
    count -= 1

    const newDcw: dcw = [date, count, word]
    backup[index] = dcw2str(newDcw)
    setDCWs(backup)
  }

  const handleDateToggle = (id: string): void => {
    dateToggles[id] = !dateToggles[id]
    setDateToggles(dateToggles)
  }

  return (
    <div className={`bg-black text-slate-300 flex flex-col`}>
      <div>{rerenders.current}</div>
      <Dates
            dateToggles={dateToggles}
            handleDateToggle={handleDateToggle}
            manualRender={manualRender}
            setManualRender={setManualRender}
          />
      <div className="flex flex-col justify-center content-center min-w-full h-full text-center">
        <Card
          currentOrd={currentOrd}
          handleNewOrd={handleNewOrd}
        />
        <Translation
            translation={translation}
            manualRender={manualRender}
            setManualRender={setManualRender}
          />
      </div>
    </div>
)}


function Card({ currentOrd, handleNewOrd }) {
  if (currentOrd === undefined) return <div></div>
  const [_, __, word]: dcw = str2dcw(currentOrd)

  return <div
      className={`flex flex-col p-[20px] text-6xl`}
      onClick={() => handleNewOrd()}
    >{word}
  </div>
}


function Translation({ translation }) {
  if (translation === undefined || !translation.hasOwnProperty('source'))
    translation = { source: 'egg' }

  return <div
      className={`border-2`}
    >{translation.translation}</div>
}


function Dates({ dateToggles, handleDateToggle, manualRender, setManualRender }) {
  return <div className={`absolute flex flex-col top-9`}>
    {Object.keys(dateToggles).map((day: string) => {
      const dayColor: string = dateToggles[day] ? 'text-slate-500' : 'text-black'

      return <button
          key={`${day}`}
          id={`${day}`}
          className={`relative ${dayColor} hover:text-slate-300 py-[0px]`}
          onClick={() => {
            handleDateToggle(day)
            setManualRender(manualRender + 1)
          }}
        >{day}</button>
    })}
  </div>
}
