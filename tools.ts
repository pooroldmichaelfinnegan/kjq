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


export { randomElement, setRandomElement }
