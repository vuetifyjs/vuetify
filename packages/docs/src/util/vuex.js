export const set = property => (store, payload) => (store[property] = payload)
export const toggle = property => store => (store[property] = !store[property])
export const push = property => (store, payload) => (store[property].push(payload))
