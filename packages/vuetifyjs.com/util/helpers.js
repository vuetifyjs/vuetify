export function camel (str) {
  const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase())

  return capitalize(camel)
}

export function kebab (str) {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function capitalize (str) {
  str = str || ''

  return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`
}
