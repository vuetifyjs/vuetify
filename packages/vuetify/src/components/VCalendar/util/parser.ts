import { CalendarCategory, CalendarCategoryTextFunction } from 'types'

export function parsedCategoryText (
  category: CalendarCategory,
  categoryText: string | CalendarCategoryTextFunction
): string {
  return typeof categoryText === 'string' && typeof category === 'object' && category
    ? category[categoryText]
    : typeof categoryText === 'function'
      ? categoryText(category)
      : category
}

export function getParsedCategories (
  categories: CalendarCategory | CalendarCategory[],
  categoryText: string | CalendarCategoryTextFunction
): CalendarCategory[] {
  if (typeof categories === 'string') return categories.split(/\s*,\s/)
  if (Array.isArray(categories)) {
    return categories.map((v: CalendarCategory) => {
      const categoryName = typeof v === 'string' ? v
        : typeof v === 'object' && v && typeof v.categoryName === 'string' ? v.categoryName
          : parsedCategoryText(v, categoryText)
      return { categoryName }
    })
  }
  return []
}
