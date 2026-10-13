export interface InternalItem<T = any> {
  value: any
  raw: T
  type?: string
}

export type FilterMatchArraySingle = readonly [number, number]

export type FilterMatchArrayMultiple = readonly FilterMatchArraySingle[]

export type FilterMatchArray = FilterMatchArraySingle | FilterMatchArrayMultiple

export type FilterMatch = boolean | number | FilterMatchArray

export type FilterFunction = (value: string, query: string, item?: InternalItem) => FilterMatch

export type FilterKeyFunctions = Record<string, FilterFunction>

export type FilterKeys = string | string[]

export type FilterMode = 'some' | 'every' | 'union' | 'intersection'

export type IgnoreAccents = boolean | 'query' | 'target'

export interface FilterProps {
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  filterKeys?: FilterKeys
  filterMode?: FilterMode
  ignoreAccents?: IgnoreAccents
  noFilter?: boolean
}
