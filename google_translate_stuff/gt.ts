import axios, { AxiosResponse } from 'axios'

export { getGT, parseData, type T, type LCEntry }


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


interface T {
  source: string
  original: string
  translation: string
  lexcats: LCs
}
interface LCs {
  pronoun: LCEntry[] | []
  noun: LCEntry[] | []
  adjective: LCEntry[] | []
  verb: LCEntry[] | []
  adverb: LCEntry[] | []
  preposition: LCEntry[] | []
}
interface LCEntry {
  word: string[]
  reverse_translation: string[] | []
  score: number
}

const parseData = (data: Data): T => {
  const t = {} as T
  t.lexcats = {} as LCs
  // console.log('gt t', t)

  t.source = data.src
  console.log('t.lexcats', t.lexcats)
  
  if (data.hasOwnProperty('sentences') && data.sentences.length) {
    t.original = data.sentences[0].orig
    t.translation = data.sentences[0].trans
  }

  if (data.hasOwnProperty('dict') && data.dict.length) {
    for (const lc of data.dict) {
      for (const entry of lc.entry) {
        // let currentLC = []
        let currentLC = t.lexcats[lc.pos]
        if (currentLC === undefined) currentLC = []
        t.lexcats[lc.pos] = [ ...currentLC, entry as LCEntry ]
        // t.lexcats[lc.pos].push(entry as LCEntry)
      }
    }
  }

  console.log('t.lexcats', t.lexcats)
  
  return t
}
  
// const parseLexCats = (dict: string[]) => dict.map(cat => `${cat.pos}: ${cat.terms.join(', ')}`)


interface Data {
  sentences: Sentence[] | []
  dict: Dict[] | []
  src: string
  spell: Spell
}
interface Sentence {
  trans: string
  orig: string
  backend: number
}
interface Spell {}
interface Dict {
  pos: string
  terms: string[]
  entry: Entry[]
  base_form: string
  pos_enum: number
}
interface Entry {
  word: string
  reverse_translation: string[]
  score: number
}

{/*
{ "sentences": [{ "trans": "as",
                  "orig": "som",
                  "backend": 1 }],
  "dict": [{ "pos": "adverb",
             "terms": [ "as" ],
             "entry": [{ "word": "as",
                         "reverse_translation": [ "som",
                                                  "ligesom" ],
                         "score": 0.29101658 }],
             "base_form": "som",
             "pos_enum": 4 },
           { "pos": "pronoun",
             "terms": [ "that",
                        "who" ],
             "entry": [{ "word": "that",
                         "reverse_translation": [ "som",
                                                  "det",
                                                  "den" ],
                         "score": 0.061961006 },
                       { "word": "who",
                         "reverse_translation": [ "der",
                                                  "som",
                                                  "hvem" ],
                         "score": 0.045331642 }],
             "base_form":" som",
             "pos_enum": 8 },
           { "pos": "adjective",
             "terms": [ "these" ],
             "entry": [{ "word": "these",
                         "reverse_translation": [ "der",
                                                  "som" ]}],
             "base_form":"som",
             "pos_enum": 3 }],
  "src": "da",
  "spell": {}}
*/}

{/*
{ "sentences": [{ "trans": "access",
                  "orig": "adgang",
                  "backend": 1 }],
  "dict": [{ "pos": "noun",
             "terms": [ "access",
                        "admission",
                        "admittance",
                        "approach" ],
             "entry": [{ "word": "access",
                         "reverse_translation": [ "adgang",
                                                  "tilgængelighed" ],
                         "score": 0.72027296 },
                       { "word": "admission",
                         "reverse_translation": [ "adgang",
                                                  "indrømmelse" ],
                         "score": 0.007516723 },
                       { "word":"admittance",
                         "reverse_translation": [ "adgang" ],
                         "score": 0.0007559767 },
                       { "word": "approach",
                         "reverse_translation": [ "adgang",
                                                  "fremgangsmøde" ]}
                      ],
             "base_form": "adgang",
             "pos_enum": 1 }],
  "src": "da",
  "spell": {}}
*/}
