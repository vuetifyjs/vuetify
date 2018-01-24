export function camel (str) {
  const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase())

  return capitalize(camel)
}

export function camelActual (str) {
  return (str || '').replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

export function kebab (str) {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function capitalize (str) {
  str = str || ''

  return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`
}

export function getLongId (id) {
  // btoa() but for node
  return Buffer.from(`gid://shopify/Product/${id}`, 'binary').toString('base64')
}

export function findProduct (store, id) {
  return store.state.store.products.find(p => p.id === id)
}

export function isOnSale (variants) {
  return variants.some(variant => {
    return parseFloat(variant.price) < parseFloat(variant.compareAtPrice)
  })
}
