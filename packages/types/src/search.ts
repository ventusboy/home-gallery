/**
 * See src/parser/grammar.ne in @home-gallery/query for details
 */
export type AstTransformType = 'keyValue' | 'inRange' | 'inList' | 'allIn' | 'query'
export type AstOrderType = 'sortKey' | 'countSortFn'

export type AstTransformRule = {
  types?: AstTransformType[]
  keys?: string[]
  matchValue?: (value: string) => string
  map: (ast: any) => any
}

export type AstOrderRule = {
  type: AstOrderType
  keys?: string[]
  sort: (entries: any[], ast: any) => any[]
}

export type AstExpression = {
  type: string
  isList: boolean
  value: AstExpression | AstExpression[]
}

export type AstFilter = AstExpression & {
  filter: (entry: any) => boolean
}