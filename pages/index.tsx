import React, { useState, useEffect, useContext, createContext } from "react"

import ords from "../arrays/ords221229-220105.json"


export default function Home() {
  const [ord, setOrd] = useState("ved")
  const [answers, setAnswers] = useState([])
  const [inputField, setInputField] = useState("")

  function random(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  const newOrd = () => {
    const rand = random(ords)
    setOrd(rand)
  }

  const onEnter = () => {
    newOrd()
    setInputField('')
  }

  const onClack = () => {
    newOrd()
    setInputField('')
  }

  return (
    <>
      <div className="bg-black text-white flex flex-col justify-center content-center">
        <div className="flex flex-col justify-center content-center min-w-full h-full text-center">
          <h1 
            className="text-8xl mt-[10px] overflow-hidden	"
            onClick={onClack}
          >{ord[0]}</h1>
          <h1 className="text-6xl text-center px-[10px] text-black text-clip hover:text-white">{ord[0]}</h1>
          {/* <h1 className="text-8xl mt-[10px]">{engDan ? "true" : "false"}</h1> */}


          <Input
            ord={ord}
            inputField={inputField}
            setInputField={setInputField}
            onClack={onClack}
            onEnter={onEnter}
          />

          <div className="w-full text-base">
            <DisplayAnswers
              answers={answers}
            />
          </div>
        </div>
      </div>
    </>
)}


function Input({ ord, inputField, setInputField, onEnter }) {
  const handleAnswerChange = (event) => {
    switch( event.key ) {
      case "Enter":
        onEnter()
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
