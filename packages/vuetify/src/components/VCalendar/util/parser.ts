// Types
import type { CalendarCategory, CalendarCategoryTextFunction } from '../types'

export function parsedCategoryText (
  category: CalendarCategory,
  categoryText: string | CalendarCategoryTextFunction | undefined
): string {
  return typeof categoryText === 'function' ? categoryText(category)
    : typeof categoryText === 'string' && typeof category === 'object' && category ? category[categoryText]
    : typeof category === 'string' ? category
    : ''
}

export function getParsedCategories (
  categories: CalendarCategory | CalendarCategory[],
  categoryText: string | CalendarCategoryTextFunction | undefined
): CalendarCategory[] {
  if (typeof categories === 'string') return categories.split(/\s*,\s/)
  if (Array.isArray(categories)) {
    return categories.map((category: CalendarCategory) => {
      if (typeof category === 'string') return category

      const categoryName = typeof category.categoryName === 'string'
        ? category.categoryName
        : parsedCategoryText(category, categoryText)
      return { ...category, categoryName }
    })
  }
  return []
}
