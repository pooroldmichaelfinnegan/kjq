import axios, { AxiosResponse } from 'axios'

export { getGT, parseData }


const getGT = async (ord: string | string[]): Promise<AxiosResponse<any, any>> => {
  const URL = `https://translate.googleapis.com/translate_a/single`
            + `?client=gtx`
            + `&dt=t`
            + `&dt=bd`
            + `&dj=1`
            + `&sl=da`
            + `&tl=en`
            + `&q=${ord}`

  const orddata: AxiosResponse<any, any> = await axios.get(URL)
  
  return orddata
}


const parseData = data => {
  const str = []

  const src = data.src

  // if (data.hasProperty(sentences)) {
  //   const orig = data.sentences[0].orig
  //   str.push(orig)
  // }

  console.log(' >>> src > ', src)

  // const trans = data.sentences[0].trans
  // str.push(trans)
  
  if (data.dict === undefined) return str

  // const lexCats = parseLexCats(data.dict)

  // return str.concat(lexCats)
}
  
const parseLexCats = (dict: string[]) => dict.map(cat => `${cat.pos}: ${cat.terms.join(', ')}`)

