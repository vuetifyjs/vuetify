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
