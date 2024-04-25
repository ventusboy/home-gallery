export type AstType = 'keyValue' | 'sdf'

export type AstTransformRule = {
  types?: AstType[],
  keys?: string[],
  matchValue?: (value: string) => string,
  map: (ast: any) => any
}
