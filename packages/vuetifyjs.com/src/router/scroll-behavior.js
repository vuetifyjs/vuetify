export default async function (to, from, savedPosition) {
  if (document.readyState !== 'complete') {
    await new Promise(resolve => {
      const cb = () => {
        window.requestAnimationFrame(resolve)
        window.removeEventListener('load', cb)
      }
      window.addEventListener('load', cb)
    })
  }

  if (to.hash) {
    return {
      selector: to.hash
    }
  }

  if (savedPosition) {
    return savedPosition
  }

  return new Promise(resolve => {
    setTimeout(() => resolve({ y: 0 }), 200)
  })
}
