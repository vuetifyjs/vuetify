import type { IUtils } from '@date-io/core/IUtils'

export interface DateAdapter<TDate> extends IUtils<TDate> {
  getWeek(date: TDate): number
}
