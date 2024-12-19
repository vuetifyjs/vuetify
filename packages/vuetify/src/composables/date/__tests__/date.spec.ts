// Types
import type { IUtils } from '@date-io/core/IUtils'
import type { DateAdapter } from '../DateAdapter'

function expectAssignable<T, T2 extends T = T> (value: T2): void {}

describe('date.ts', () => {
  // Cannot define properties that don't exist in date-io
  expectAssignable<DateAdapter>({} as IUtils<Date, string>)
  // @ts-expect-error Can implement a subset of date-io
  expectAssignable<IUtils<Date>>({} as DateAdapter)
})
