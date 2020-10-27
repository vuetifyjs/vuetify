export class Parser {
  static parsedCategoryText (
    category: any,
    categoryText: string | Function
  ): any {
    return typeof categoryText === 'string'
      ? category[categoryText]
      : typeof categoryText === 'function'
        ? categoryText(category)
        : category
  }

  static getParsedCategories (categories: string | any[], categoryText: string | Function): any[] {
    if (typeof categories === 'string') return categories.split(/\s*,\s/)
    if (Array.isArray(categories)) {
      return categories.map((v: any) => {
        const categoryName = typeof v === 'string' ? v
          : typeof v.categoryName === 'string' ? v.categoryName
            : this.parsedCategoryText(v, categoryText)
        return { categoryName }
      })
    }
    return []
  }
}
