export interface VTimestamp {
  date: string
  time: string
  year: number
  month: number
  day: number
  weekday: number
  hour: number
  minute: number
  hasDay: boolean
  hasTime: boolean
  past: boolean
  present: boolean
  future: boolean
}

export interface VTimeObject {
  hour: number
  minute: number
}

export type VTime = number | string | VTimeObject

export type VTimestampFormatter = (timestamp: VTimestamp, short: boolean) => string

export type VTimestampFormatOptions = (timestamp: VTimestamp, short: boolean) => object

export type VTimestampOperation = (timestamp: VTimestamp) => VTimestamp

export interface VEventInput {
  [prop: string]: any
}
