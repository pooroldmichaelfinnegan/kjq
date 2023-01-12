export interface Data {
  sentence: string[]
  dict?: Dict[]
  src: string
  spell: Object
}

export interface Dict {
  pos: string,
  terms: string[]
  entry: LexicalCategory[]
  base_form: string
  pos_enum: number
}

export interface LexicalCategory {
  word: string
  reverse_translation: string[]
  score: number
}

// { "word": "who",
//             "reverse_translation": [ "der",
//                                      "som",
//                                      "hvem" ],
//             "score": 0.045331642 }]