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

  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return {
      selector: to.hash,
      offset: { y: 80 }
    }
  }

  return new Promise(resolve => {
    setTimeout(() => resolve({ y: 0 }), 250)
  })
}
