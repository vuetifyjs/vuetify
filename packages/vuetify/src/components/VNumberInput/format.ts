const NUMERAL_ZEROS = [
  0x0660, // Arabic-Indic
  0x06F0, // Extended Arabic-Indic — Persian, Dari
  0x0966, // Devanagari
  0x09E6, // Bengali
  0x0A66, // Gurmukhi
  0x0AE6, // Gujarati
  0x0B66, // Oriya
  0x0BE6, // Tamil
  0x0C66, // Telugu
  0x0CE6, // Kannada
  0x0D66, // Malayalam
  0x0E50, // Thai
  0x0ED0, // Lao
  0x0F20, // Tibetan
  0x1040, // Myanmar
  0x17E0, // Khmer
  0x1810, // Mongolian
  0xFF10, // Fullwidth
]

function normalizeDigits (str: string): string {
  return str.replace(/[^\x20-\x7F]/g, char => {
    const code = char.codePointAt(0)!
    for (const zero of NUMERAL_ZEROS) {
      if (code >= zero && code <= zero + 9) {
        return String(code - zero)
      }
    }
    return char
  })
}

interface FormatNumberOptions {
  locale: string
  precision?: number | null
  minFractionDigits?: number | null
  useGrouping: Intl.NumberFormatOptions['useGrouping']
  decimalSeparator: string
  groupSeparator: string
}

export function formatNumber (val: number, options: FormatNumberOptions): string {
  const { precision, minFractionDigits } = options
  const formatter = new Intl.NumberFormat(
    options.locale, {
      minimumFractionDigits: minFractionDigits && precision != null
        ? Math.min(minFractionDigits, precision)
        : (minFractionDigits ?? precision ?? undefined),
      maximumFractionDigits: precision ?? undefined,
      useGrouping: options.useGrouping,
    })

  return formatter.formatToParts(val)
    .map(p => {
      if (p.type === 'group') return options.groupSeparator
      if (p.type === 'decimal') return options.decimalSeparator
      return normalizeDigits(p.value)
    })
    .join('')
}

export function parseNumber (
  val: string | null | undefined,
  groupSeparator: string,
  decimalSeparator: string,
  hasGrouping: boolean,
): number {
  const stripped = hasGrouping ? val?.replaceAll(groupSeparator, '') : val
  return Number(stripped?.replace(decimalSeparator, '.'))
}
