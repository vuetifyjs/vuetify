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

export function randomNumber (min, max) {
  return Math.floor(Math.random() * max) + min
}

export function randomString (length = 5) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}
