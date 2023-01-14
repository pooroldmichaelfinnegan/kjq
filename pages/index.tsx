import React, { useState, useEffect, useRef } from "react"
import fs from 'fs'

import { randomElement, setRandomElement, date_YYMMDD_hhmmss } from "../tools"
import { getGT } from "../google_translate_stuff/gt"
import wordList from "../../google_drive_pomf/str_ords.json"


const sampleWords = ["220101 3 A", "220109 4 B", "220102 7 C", "220101 10 D"]
const today = date_YYMMDD_hhmmss()

const ARRAY = wordList


enum zeroNine {zero, one, two, three, four}
enum onOff { off, on }
type dcw = [string, number, string]

const str2dcw = (str: string): dcw => {
  const date: string = str.slice(0,6)
  const count: number = parseInt(str.slice(7,8))
  const word: string = str.slice(9)

  return [date, count, word]
}



const getDates = (obj: (string|number)[][]): [string,boolean][] => {
  const check: string[] = []
  const arr: [string,boolean][] = []
  
  for (const str of obj) {
    const date = str.slice(6)
    if (check.indexOf(date) === -1)
      check.push(date)
      arr.push([date, 0])
  }
  return arr
}
const allDates = getDates(ARRAY)
console.log(" >>> allDate", allDates)


const calcWordArrays = (obj: string[]) => {
  const arr: [string, string][] | [][] = [[],[],[],[],[]]

  for (const str in obj) {
    const count: string = dcw
    if (0 > count || count > 4)
      continue
    arr[count].push()
  }

  console.log(arr)
  return arr
}

// const words = calcWordArrays(sample)


export default function Home() {
  const [currentOrd, setCurrentOrd] = useState('')
  const rerenders: {current: number} = useRef(0)

  // useEffect(() => {
  //   if (currentOrd === undefined || currentOrd === '') {
  //     setRandomElement(setCurrentOrd, ARRAY)
  //   }
  // })

  // useEffect(() => {
  //   rerenders.current += 1
  // })

  const handleSub = () => {
    rerenders.current += 1
    // setRandomElement(setCurrentOrd, ARRAY)
    setCurrentOrd(ARRAY[rerenders.current])
  }

  return (
    <div className="bg-black text-white flex flex-col justify-center content-center">
      <div>{rerenders.current}</div>
      {/* <Dates /> */}
      <button
          className={``}
          onClick={() => handleSub()}
        >-</button>
      <div className="flex flex-col justify-center content-center min-w-full h-full text-center">
        <Card
            currentOrd={currentOrd}
          />
      </div>
    </div>
)}


function Card({ currentOrd }) {
  return <div className={`flex flex-col height-[100%] text-8xl`}>
    {currentOrd.slice(9)}
  </div>
}


// function Dates() {
//   return <div className={`flex flex-col absolute`}>
//     {allDates.map((day) => {
//       return <button
//           id={`${day}`}
//           className={``}
//         >
//         {day}
//       </button>
//     })}
//   </div>
// }
