// Utilities
import { isFunction, isObject, isString } from '@/util'

// Types
import type { CalendarCategory, CalendarCategoryTextFunction } from '../types'

export function parsedCategoryText (
  category: CalendarCategory,
  categoryText: string | CalendarCategoryTextFunction | undefined
): string {
  return isFunction(categoryText) ? categoryText(category)
    : isString(categoryText) && isObject(category) ? category[categoryText]
    : isString(category) ? category
    : ''
}

export function getParsedCategories (
  categories: CalendarCategory | CalendarCategory[],
  categoryText: string | CalendarCategoryTextFunction | undefined
): CalendarCategory[] {
  if (isString(categories)) return categories.split(/\s*,\s/)
  if (Array.isArray(categories)) {
    return categories.map((category: CalendarCategory) => {
      if (isString(category)) return category

      const categoryName = isString(category.categoryName)
        ? category.categoryName
        : parsedCategoryText(category, categoryText)
      return { ...category, categoryName }
    })
  }
  return []
}
