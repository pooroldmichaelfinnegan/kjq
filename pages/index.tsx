// import Head from "next/head"
// import Image from "next/image"
// import styles from "../styles/Home.module.css"

import React, { useState, useEffect, useContext, createContext } from "react"


const subject = [["i", "jeg"],["you", "du"],["he", "han"],["she", "hun"],["we", "vi"],["you", "i"],["they", "de"]]
const object = [["me", "mig"],["you", "dig"],["him", "ham"],["her", "hende"],["us", "os"],["you", "jer"],["them", "dem"]]

const egg = [
  ["af", "off"],
  ["at", "to, that, as to"],
  ["av", "of"],
  ["bag", "behind"],
  ["blitt", "become"],
  ["eller", "or"],
  ["fint", "fine"],
  ["før", "until, before"],
  ["fordi", "because"],
  ["frå", "from"],
  ["hvilken", "which"],
  ["hvis", "if"],
  ["lave", "make"],
  ["med", "with"],
  ["men", "but"],
  ["mens", "while, as"],
  ["når", "when"],
  ["nær", "near"],
  ["òg", "and"],
  ["om", "about, on, if, whether, in"],
  ["på", "on"],
  ["rører ved", "touching"],
  ["sjå", "see, look"],
  ["som", "what, that, like, as"],
  ["to", "to, for, into, until"],
  ["uden", "without"],
  ["være", "be, have, make"],
  ["var", "was, had, where"],
  ["ved", "near, at, know, to"]
]
const egg2 = [["gøre", "do"],
["var", "was"],
["vel", "well"],
["vil", "will"],
["stadig", "still"],
["meget", "very"],
["tage", "take"],
["skal", "shall, must"],
["kun", "only"],
["få", "get"],
["smager", "taste"],
["første", "first"],
["gang", "time"],
["slik", "sweets"],
["synes", "think"],
["tror", "think"],
["tænke", "think"],
["slags", "kind of"],
["også", "also"],
["", ""],
["", ""],
["måske", "maybe"],
["andre", "others"],
["nogle", "some"],
["en masse", "a lot"],
["udlændinge", "foreiners"],
["valgte", "chose"],
["især", "especially"],
["mennesker", "people"],
["verden", "the world"],
["sprog", "language"],
["", ""],
["sådan", "such, like"],
["hedder", "called"],
["forhold", "relation"],
["i hvert fald", "at least"],
["åbenhed", "openness"],
["spændende", "interesting"],
["består", "consists"],
["hele tiden", "all the time"],
["omfatfer", "includes"],
["fløde","cream"],
["selmer", "hymes"],
["typisk", "typical"],
["lækkert", "lovely, nice"],
]


// import måneder_months from "../arrays/måneder__months.json"
// import months_måneder from "../arrays/months__måneder.json"
// import ugens_dage__days_of_the_week from "../arrays/ugens_dage__days_of_the_week.json"
// import days_of_the_week__ugens_dage from "../arrays/days_of_the_week__ugens_dage.json"
// import oneToTwenty from "../arrays/numbers.json"
import simp from "../arrays/simple.json"

// import { FunEasyLearn } from "../arrays/FunEasyLearn/all"
import ords221229 from "../arrays/ords221229.json"
import ords221230 from "../arrays/ords221230.json"
import ords221231 from "../arrays/ords221231.json"
import ords230101 from "../arrays/ords230101.json"
import ords230102 from "../arrays/ords230102.json"
import ords230103 from "../arrays/ords230103.json"
import ords230104 from "../arrays/ords230104.json"
import ords230105 from "../arrays/ords230105.json"

const arr = [
  ...ords221229,
  ...ords221230,
  ...ords221231,
  ...ords230101,
  ...ords230102,
  ...ords230103,
  ...ords230104,
  ...ords230105,
  ...simp
]

// const arr = ord221229

// let withCount = arr.map((words) => {
//   console.log("use effect first", words)
//   return [5, ...words]
// })

// function handleCount(word) {
//   withCount.map(ord => {
//     if (word === ord[1] || word === ord[2]) {
//       return [ ord[0] - 1, ord[1], ord[2] ]
//     }
//     return ord
//   })
// }

const danEng = createContext()

export default function Home() {
  const [engDan, setEngDan] = useState(1)
  const [answers, setAnswers] = useState([])
  const [inputField, setInputField] = useState("")
  const [ord, setOrd] = useState(["music", "musik"])
  const [withCount, setWithCount] = useState(arr.map((words) => { return [1, ...words] }))

  // const [wordsStill, setWordsStill] = useState(withCount.map(word => { if (word[0] > 0) { return word }}))

  // console.log(" >>>> wordsstill", wordsStill)
  // console.log(" >>>> before", ord[0])

  useEffect(() => {
    const rand = random(wordsStillFunc())
    // console.log(" >>>>>>>>>>>>>>>>> effect", rand)
    setOrd(rand)
  }, answers)

  function wordsStillFunc() {
    const arr = []

    withCount.map(word => {
      if (word[0] > 0) { arr.push(word) }
    })

    if (!arr.length) {
      // console.log( "ARRAY IS EMPTY" )

      return [[ 999, "FINISHED", "FINISHED" ]]
    }

    return arr
  }

  function random(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  // console.log(" >>>> egg", ord)

  return (
    <danEng.Provider value={engDan}>
      <div className="absolute p-2">
        <button onClick={() => setEngDan(!engDan)} >
          {engDan ? "dan/eng" : "eng/dan"}
        </button>
        <ListOfWords list={withCount} />
      </div>
      <div className="bg-black text-white flex flex-col justify-center content-center">
        {/* <div className="w-1/3 py-[50px] px-[25px]">
          <button onClick={() => setEngDan(!engDan)} >
            {engDan ? "dan/eng" : "eng/dan"}
          </button>*/}

        <div className="flex flex-col justify-center content-center min-w-full h-full text-center">
          <h1 className="text-8xl mt-[10px] overflow-hidden	">{engDan ? ord[1] : ord[2]}</h1>
          <h1 className="text-6xl text-center px-[10px] text-black text-clip hover:text-white">{engDan ? ord[2] : ord[1]}</h1>
          {/* <h1 className="text-8xl mt-[10px]">{engDan ? "true" : "false"}</h1> */}


          <Input
            ord={ord}
            inputField={inputField}
            setInputField={setInputField}
            answers={answers}
            setAnswers={setAnswers}
            withCount={withCount}
            setWithCount={setWithCount}
          />

          <div className="w-full text-base">
            <DisplayAnswers
              engDan={engDan}
              answers={answers}
            />
          </div>
        </div>
      </div>
    </danEng.Provider>
)}


// function Card({ answers, setAnswers }) {
//   const [inputField, setInputField] = useState("")

//   return <div>
//     {/* card<br /> */}

//     <Input inputField={inputField} setInputField={setInputField} answers={answers} setAnswers={setAnswers} /><br />
//     {inputField}
//   </div>
// }


function Input({ ord, inputField, setInputField, answers, setAnswers, withCount, setWithCount }) {
  const engDan = useContext(danEng)

  // console.log(" >>>> input ord", ord)
  const toggle = engDan ? ord[0] : ord[1]
  
  const handleAnswerChange = (event) => {
    switch( event.key ) {
      case "Enter":
        if ((inputField === ord[1]) || (inputField === ord[2]) || inputField === `'`) {
          setWithCount( withCount.map(word => {
            // if (word[0] < 1) return
            if ((ord[1] === word[1] || ord[2] === word[2]) || (ord[1] === word[2] || ord[2] === word[1])) {
              // console.log(`>>> ${ord[1]}\n>>> ${ord[2]}\ntrue\n ${word}>>>\n>>>\n`)

              return [ word[0] - 1, word[1], word[2] ]
            }
            return word
          }))
        } else {
          setWithCount( withCount.map(word => {
            // if (word[0] < 1) return
            if ((ord[1] === word[1] || ord[2] === word[2]) || (ord[1] === word[2] || ord[2] === word[1])) {
              // console.log(`>>> ${ord[1]}\n>>> ${ord[2]}\ntrue\n ${word}>>>\n>>>\n`)

              return [ word[0] + 2, word[1], word[2] ]
            }
            return word
          }))
        }

        setAnswers(
          [{ rightWrong: ((inputField === ord[1]) || (inputField === ord[2])) ? "text-lime-500" : "text-red-500",
              word1: ord[1],
              word2: ord[2],
              input: inputField },
          ...answers ])

        setInputField("")

  }}

  return <input
    className="bg-black text-center my-4 w-full"
    type="text"
    onKeyDown={handleAnswerChange}
    value={inputField}
    onChange={(e) => {
      setInputField(e.target.value)
    }}
  />
}


function DisplayAnswers({ answers }) {
  // console.log("ansewrs >>> ", answers)
  const engDan = useContext(danEng)

  return answers.map((row: string[]) => {
    const toggle = engDan ? row[1] : row[2]

    return (
      <div className={`flex flex-row justify-center w-100% text-left`}>{/*border-[1px] border-gray-500`}>*/}  
        <div className={`basis-1/4 py-1 px-3 truncate`}>{row["word1"]}</div>
        <div className={`basis-1/2 py-1 px-3 truncate`}>{row["word2"]}</div>
        {/* <div className={`basis-1/4 py-1 px-3 truncate ${row["rightWrong"]} text-right`}>{row["input"]}</div> */}
        <div className={`basis-1/4 py-1 px-3 truncate text-right`}>{row["input"]}</div>
      </div>
  )})
}


function ListOfWords({ list }) {
  const array = []
  list.map((ord) => { if (ord[0] > 0) { array.push(ord) }})

  return <>
    <div className="py-1">{array.length}</div>

    {/* {array.map((ord) => {
      return <div className="border-[1px] border-gray-800 text-xs flex flex-row justify-center align-center">
        <div className={`basis-1/4 py-1 px-3 truncate text-xg`}>{ord[0]}</div>
        <div className={`basis-1/2 py-1 px-3 truncate text-xg`}>{ord[1]}</div>
        <div className={`basis-1/4 py-1 px-3 truncate text-xg`}>{ord[2]}</div>
      </div>
    })} */}
  </>
}
