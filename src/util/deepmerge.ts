export default function deepmerge (target: any, ...source: any[]): Record<string, any> {
  const destination: Record<string, any> = {}

  if (target && typeof target === 'object') {
    for (const key in target) {
      destination[key] = target[key]
    }
  }

  source.forEach(source => {
    for (const key in source) {
      if (!isMergeableObject(source[key]) || !destination[key]) {
        destination[key] = isMergeableObject(source[key]) ? deepmerge({}, source[key]) : source[key]
      } else {
        destination[key] = deepmerge(destination[key], target[key], source[key])
      }
    }
  })

  return destination
}

function isMergeableObject (value: any) {
  return !!value && typeof value === 'object'
}
