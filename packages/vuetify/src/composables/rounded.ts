
const ROUNDED = [
  true,
  false,
  '',
  0,
  '0',
  'xs',
  'sm',
  'lg',
  'xl',
  'circle',
  'pill',
  'shaped',
  'tile',
] as const

export type IRounded = typeof ROUNDED[number]

export type IMaybeRoundedProps = Partial<Record<'rounded', IRounded>>

export const roundedClassNames = (
  props: IMaybeRoundedProps,
): string[] => {
  const classes = []

  if (props && 'rounded' in props) {
    const rounded = props.rounded

    if (rounded == null) {
      // noop
    } else if (rounded === true || rounded === '') {
      classes.push('rounded')
    } else if ([false, 0, '0', 'tile'].includes(rounded)) {
      classes.push('rounded-0')
    } else if (typeof rounded === 'string') {
      const values = rounded.split(' ')

      for (const value of values) {
        classes.push(`rounded-${value}`)
      }
    }
  }

  return classes.sort()
}

export const isRounded = (input: any): input is IRounded => {
  return ROUNDED.includes(input)
}
