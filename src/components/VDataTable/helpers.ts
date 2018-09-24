import TableHeader from './TableHeader'
import { getObjectValueByPath } from '../../util/helpers'

export function defaultSort (
  items: any[],
  sortBy: string[],
  sortDesc: boolean[],
  locale: string,
  headers: Record<string, TableHeader>): any[] {
  if (sortBy === null || sortBy.length === 0) return items

  return items.sort((a: any, b: any): number => {
    for (let i = 0; i < sortBy.length; i++) {
      const sortKey = sortBy[i]

      let sortA = getObjectValueByPath(a, sortKey)
      let sortB = getObjectValueByPath(b, sortKey)

      if (sortDesc[i]) {
        [sortA, sortB] = [sortB, sortA]
      }

      if (headers[sortKey]) return headers[sortKey].sort!(sortA, sortB)

      // Check if both cannot be evaluated
      if (sortA === null && sortB === null) {
        return 0
      }

      [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString())

      if (sortA !== sortB) {
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
        // if (sortA > sortB) return 1
        // if (sortA < sortB) return -1
        return sortA.localeCompare(sortB, locale)
      }
    }

    return 0
  })
}
