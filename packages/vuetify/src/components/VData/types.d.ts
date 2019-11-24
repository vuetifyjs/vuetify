export interface DataOptions {
  page: number
  itemsPerPage: number
  sortBy: string[]
  sortDesc: boolean[]
  groupBy: string[]
  groupDesc: boolean[]
  multiSort: boolean
  mustSort: boolean
}

export interface DataPagination {
  page: number
  itemsPerPage: number
  pageStart: number
  pageStop: number
  pageCount: number
  itemsLength: number
}

export interface DataProps {
  originalItemsLength: number
  items: any[]
  pagination: DataPagination
  options: DataOptions
  updateOptions: (obj: any) => void
  sort: (value: string) => void
  group: (value: string) => void
  groupedItems: Record<string, any[]> | null
}

export type compareFn<T = any> = (a: T, b: T) => number

export type SortItemsFn<T extends any[] = any[]> = (
  items: T,
  sortBy: string[],
  sortDesc: boolean[],
  locale: string,
  customSorters?: Record<string, compareFn>
) => T;
