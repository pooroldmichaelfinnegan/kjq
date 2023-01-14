function randomElement(array: Array<any>, ): any {
  return array[Math.floor(Math.random() * array.length)]
}


const setRandomElement = (
    func: React.Dispatch<React.SetStateAction<any>>,
    array: any[],
  ): void => {
  const element = randomElement(array)

  func(element)
}


const date_YYMMDD_hhmmss = (): string => {
  const date = new Date()

  const YY = `00${date.getFullYear()}`.slice(-2)
  const MM = `00${date.getMonth()+1}`.slice(-2)
  const DD = `00${date.getDate()}`.slice(-2)
  const hh = `00${date.getHours()}`.slice(-2)
  const mm = `00${date.getMinutes()}`.slice(-2)
  const ss = `00${date.getSeconds()}`.slice(-2)

  return `${YY}${MM}${DD}_${hh}${mm}${ss}`
}


export { randomElement, setRandomElement, date_YYMMDD_hhmmss }
