export function camel (str) {
  const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase())

  return `${camel.substr(0, 1).toUpperCase()}${camel.slice(1)}`
}

export function kebab (str) {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
