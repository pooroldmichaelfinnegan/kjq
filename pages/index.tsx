import { useEffect, useRef, useState } from "react"

import { getGT, LCEntry, parseData } from "../google_translate_stuff/gt"
import { randomElement } from "../tools"

// import wordList from "../../google_drive_pomf/str_ords.json"
import wordList from "../../google_drive_pomf/date_where_ord.json"


interface DWO {
  date: string
  where: number
  ord: string
}

const ARRAY: DWO[] = wordList
const BACKUP = ARRAY
const DEFAULT_DWO: DWO = { date: "221228", where: 1, ord: "ved" } as DWO


const getDates = (array: DWO[]): Record<string, Boolean> => {
  const datesToggle: Record<string, Boolean> = {}
  let dwo: DWO

  for (dwo of array) {
    datesToggle[dwo.date] = false
  }
  return datesToggle
}


const calcWordArray = (array: DWO[], date_toggles: Record<string, Boolean>): DWO[] => {
  let dwo_pool: DWO[] = []
  let dwo: DWO

  for (dwo of array) {
    if (date_toggles[dwo.date] == false) continue
    if (0 > dwo.where) continue
    if (dwo.where > 4) continue

    for (let i = 0; i < dwo.where; i++) {
      dwo_pool = [...dwo_pool, dwo]
    }
  }
  return dwo_pool
}


export default function Home() {
  const [Array, setArray] = useState<DWO[]>(ARRAY)
  const [currentOrd, setCurrentOrd] = useState<DWO>(DEFAULT_DWO)
  const [dateToggles, setDateToggles] = useState<Record<string, Boolean>>(getDates(Array))
  const [wordArray, setWordArray] = useState(calcWordArray(Array, dateToggles))
  const [translation, setTranslation] = useState()
  const rerenders: { current: number } = useRef(0)

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

    getGT(currentOrd.ord)
      .then(response => response.data)
      // .then(log => console.log(log))
      .then(data => parseData(data))
      .then(t => setTranslation(t))

  }, [currentOrd])

  const handleNewOrd = (): void => {
    const wa = calcWordArray(Array, dateToggles)
    setWordArray(wa)

    let newOrd: DWO = currentOrd

    if (!wa.length) {
      setCurrentOrd(DEFAULT_DWO)
      return
    }


    do {
      // console.log(' _in while loop_', newOrd.ord)
      newOrd = randomElement(wa)
    } while (wa.length > 1 && newOrd.ord == currentOrd.ord)
    // newOrd = randomElement(wa)
    setCurrentOrd(newOrd)
  }

  const handleAdd = (): void => {
    const newArray: DWO[] = Array
    const index = Array.indexOf(currentOrd)

    if (currentOrd.where < 4) {
      currentOrd.where += 1
      newArray[index] = currentOrd
    }

    setArray(newArray)
    handleNewOrd()
  }

  const handleSub = (): void => {
    const newArray: DWO[] = Array
    const index = Array.indexOf(currentOrd)

    if (currentOrd.where > 0) {
      currentOrd.where -= 1
      newArray[index] = currentOrd
    }

    setArray(newArray)
    handleNewOrd()
  }

  const handleDateToggle = (id: string): void => {
    dateToggles[id] = !dateToggles[id]
    setDateToggles(dateToggles)
  }

  return (
    <div className={`bg-black text-slate-300 flex flex-col`}>
      <div className={`absolute`}>
        <div className={``}>{rerenders.current}</div>
        <div className={``}>{wordArray.length}</div>
        {/* <div className={``}>{Array.length}</div> */}
        <Dates dateToggles={dateToggles}
               handleDateToggle={handleDateToggle}
               manualRender={manualRender}
               setManualRender={setManualRender} />
      </div>
      <div className={`border-0 flex flex-col justify-center content-center text-center pt-[130px]`}>
        <Card currentOrd={currentOrd}
              handleNewOrd={handleNewOrd} />
        <div className={`flex flex-row justify-center text-8xl`}>
          <button className={`px-[30px] border-0`} onClick={() => handleAdd()}>+</button>
          <button className={`px-[30px] border-0`} onClick={() => handleSub()}>-</button>
        </div>
        <Translation translation={translation}
          manualRender={manualRender}
          setManualRender={setManualRender} />
      </div>
    </div>
  )
}


function Card({ currentOrd, handleNewOrd }) {
  if (currentOrd === undefined) return <div>currentOrd undefined</div>

  const getColor = <T,>(array: T[]): T => array[currentOrd.where]

  // const col: string[] = [`text-green-300`, `text-green-200`, `text-white`, `text-red-200`, `text-red-300`]
  const colors: string[] = [`text-green-200`, `text-white`, `text-red-100`, `text-red-200`, `text-red-300`]

  const color = getColor(colors)

  return <div className={`flex flex-row justify-center items-stretch h-[220px] border-0`}>
    <div className={`${color} text-4xl p-[20px] pt-[35px]`}>⬤</div>
    <div className={`text-white text-8xl min-w-[100px] border-0`}
         onClick={() => handleNewOrd()}
      >{currentOrd.ord}
    </div>
    <div className={`${color} text-4xl p-[20px] pt-[35px]`}>⬤</div>
  </div>
}


function Translation({ translation }) {
  let a: JSX.Element[] | undefined

  if (translation === undefined) return <div>translation undefined</div>

  if (translation.hasOwnProperty('lexcats')) {
    let color: string

    a = Object.keys(translation.lexcats).map(lc => {
      // console.log('lc > ', translation.lexcats[lc])
      return <div className={`flex flex-row`}>
        {/* <div className={`w-1/6 border-0`}></div> */}
        <div className={`flex flex-row justify-center w-5/6 px-[20px] border-0`}>
          <div className={`w-1/2 text-right text-xs border-0`}>{lc}</div>
          <div className={`flex flex-col justify-center w-1/2 border-0`}>
            {translation.lexcats[lc].map((en_word: LCEntry) => {
              color = en_word.score ? 'text-slate-200 ' : 'text-slate-400'
              return <div className={`w-7/8 flex flex-col justify-left border-0 py-[3px] ${color}`}>
                <div className={`relative flex flex-row w-2/5 px-[5px] text-left border-0`}>
                  <div className={`absolute text-xs -left-2 -bottom-1 pr-[5px]`} >{Math.round(en_word.score * 10) + 1 || ''}</div>
                  <div className={`text-xl`} >{en_word.word}</div>
                </div>
                <ReverseTranslation en_word={en_word} color={color} />
              </div>
            })}
          </div>
        </div>
      </div>
    })
  }

  if (a === undefined) { a = [<div>a is undefined</div>] }

  return <div className={`flex flex-col border-0`}>
    <div className={`text-4xl py-[20px]`}>{translation.translation}</div>
    {a}
  </div>
}

function ReverseTranslation({ en_word, color }: { en_word: LCEntry, color: string }) {
  if (!en_word.hasOwnProperty('reverse_translation')) return <div>no reverse_translation</div>

  return <div className={`flex flex-row`}>
    {en_word.reverse_translation.map((rt_word: string) => {
      color = en_word.score ? 'text-slate-300 ' : 'text-slate-500'
      return <div className={`px-[5px] align-center flex-nowrap text-left text-xs border-0 overflow-visible ${color}`}>{rt_word}</div>
    })}
  </div>
}

function Dates({ dateToggles, handleDateToggle, manualRender, setManualRender }) {
  return <div className={`flex flex-col`}>
    {Object.keys(dateToggles).map((day: string) => {
      const dayColor: string = dateToggles[day] ? 'text-slate-500' : 'text-black'

      return <button
        key={`${day}`}
        id={`${day}`}
        className={`relative ${dayColor} hover:text-slate-300`}
        onClick={() => {
          handleDateToggle(day)
          setManualRender(manualRender + 1)
        }}
      >{day}</button>
    })}
  </div>
}
