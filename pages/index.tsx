import React, { useState, useEffect, useRef } from "react"
import axios from 'axios'

import { randomElement, setRandomElement, date_YYMMDD_hhmmss } from "../tools"
import { getGT, parseData, T, LCEntry } from "../google_translate_stuff/gt"
import wordList from "../../google_drive_pomf/str_ords.json"
import { disconnect } from "process"


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
      <Dates dateToggles={dateToggles}
             handleDateToggle={handleDateToggle}
             manualRender={manualRender}
             setManualRender={setManualRender} />
      <div className="flex flex-col justify-center content-center min-w-full h-full text-center">
        <Card currentOrd={currentOrd}
              handleNewOrd={handleNewOrd} />
        <Translation translation={translation}
                     manualRender={manualRender}
                     setManualRender={setManualRender} />
      </div>
    </div>
)}


function Card({ currentOrd, handleNewOrd }) {
  if (currentOrd === undefined) return <div></div>
  const [_, __, word]: dcw = str2dcw(currentOrd)

  return <div
      className={`flex flex-col p-[200px] text-8xl`}
      onClick={() => handleNewOrd()}
    >{word}
  </div>
}


function Translation({ translation, manualRender, setManualRender }) {
  if (translation === undefined || !translation.hasOwnProperty('source')) {
    translation = { source: 'egg' }
  }
  
  let a: JSX.Element
  // let a: any

  if (translation.hasOwnProperty('lexcats')) {
    // setManualRender(manualRender + 1)
    // a = <div>working but not</div> 
    a = Object.keys(translation.lexcats).map(lc => {
      // console.log('lc > ', translation.lexcats[lc])
      return <div className={`flex flex-row`}>
        {/* <div className={`w-1/6 border-0`}></div> */}
        <div className={`flex flex-row justify-center w-5/6 px-[20px] border-0`}>
          <div className={`w-1/5 text-left border-0`}>{lc}</div>
          <div className={`flex flex-col justify-center w-3/4 border-0`}>
            {translation.lexcats[lc].map((en_word: LCEntry) => {
              let color = en_word.score ? 'text-slate-200 ': 'text-slate-400'
              return <div className={`w-7/8 flex flex-row justify-left border-0 py-[3px] ${color}`}>
                <div className={`w-2/5 px-[5px] text-left border-0`}>{en_word.word}</div>
                {/* <div className={`w-[100px] p-[5px] text-left`}>{en_word.score}</div> */}
                {en_word.reverse_translation.map((rt_word: string) => {
                  color = en_word.score ? 'text-slate-300 ': 'text-slate-500'
                  return <div className={`px-[5px] flex-nowrap text-left border-0 overflow-visible ${color}`}>{rt_word}</div>
                })}
              </div>
            })}
          </div>
        </div>
      </div>
    })
  }

  if (a === undefined) {
    a = <div>a is undefined</div>
  }


  return <div className={`flex flex-col border-0`}>
    <div className={`text-4xl py-[20px]`}>{translation.translation}</div>
    {a}
  </div>
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
