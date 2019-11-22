export type DatePickerFormatter = (date: string) => string

export type AllowedDateFunction = (date: string) => boolean

export type DateEventColorValue = string | string[]

export type DateEvents = string[] | ((date: string) => boolean | DateEventColorValue) | Record<string, DateEventColorValue>

export type DateEventColors = DateEventColorValue | Record<string, DateEventColorValue> | ((date: string) => DateEventColorValue)

export type DatePickerType = 'date' | 'month'

export type DatePickerMultipleFormatter = (date: string[]) => string
