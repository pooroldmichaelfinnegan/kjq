import React, { useState, useEffect, useContext, createContext } from "react"


import { getGT } from "../google_translate_stuff/gt"
import ords from "../arrays/ords_gt_221229_230105.json"

const simple = [
  [ "værdi" ],
  [ "støtter" ],
]

const ctx_solution = createContext(0)

export default function Home() {
  const [words, setWords] = useState([])
  const [ord, setOrd] = useState([''])
  const [answers, setAnswers] = useState([])
  const [inputField, setInputField] = useState("")

  function random(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)]
  }

  const newOrd = () => {
    const rand = random(ords)
    console.log(rand)
    setOrd(rand)
  }

  const onEnter = () => {
    newOrd()
    setInputField('')
  }

  const onClack = () => {
    newOrd()
    // setInputField('')
  }

  return (
    <ctx_solution.Provider value={0}>
      <div className="bg-black text-white flex flex-col justify-center content-center">
        <div className="flex flex-col justify-center content-center min-w-full h-full text-center">
          <Card
            ord={ord} 
            onClack={onClack}
          />
          <Input
            ord={ord}
            inputField={inputField}
            setInputField={setInputField}
            onClack={onClack}
            onEnter={onEnter}
          />
        </div>
      </div>
    </ctx_solution.Provider>
)}


function Card({ ord, onClack }) {
  console.log({ ord })

  return <div className={`flex flex-col height-[100%]`} onClick={onClack}>
    <div className={`basis-1/2 text-8xl`}>{ord[0]}</div>
    <div className={`text-black hover:text-white`}>
      <div className={`basis-1/4`}>{ord[1]}</div>
      {ord.length > 1 && [ ...ord ].slice(2).map(str => <div className={`basis-1/4`}>{str}</div>)}
    </div>
  </div>
}


function Input({ ord, inputField, setInputField, onEnter }) {
  const handleInputChange = event => {
    switch( event.key ) {
      case "Enter":
        onEnter()
  }}

  return <input
    className="bg-black text-center my-4 w-full"
    type="text"
    onKeyDown={handleInputChange}
    value={inputField}
    onChange={(e) => {
      setInputField(e.target.value)
    }}
  />
}


function DisplayAnswers({ answers }) {
  return answers.map((row: string[]) => {
    return (
      <div className={`flex flex-row justify-center w-100% text-left`}>{/*border-[1px] border-gray-500`}>*/}  
        <div className={`basis-1/4 py-1 px-3 truncate`}>{row["word1"]}</div>
        <div className={`basis-1/2 py-1 px-3 truncate`}>{row["word2"]}</div>
        {/* <div className={`basis-1/4 py-1 px-3 truncate ${row["rightWrong"]} text-right`}>{row["input"]}</div> */}
        <div className={`basis-1/4 py-1 px-3 truncate text-right`}>{row["input"]}</div>
      </div>
  )})
}
