// Globals
import { IN_BROWSER } from '@/util/globals'

export default async function (vuetify, to, from, savedPosition) {
  if (
    !IN_BROWSER ||
    (from && to.path === from.path)
  ) return

  let scrollTo = 0

  if (to.hash) scrollTo = to.hash
  else if (savedPosition) scrollTo = savedPosition.y

  // TODO: https://github.com/vuejs/vue-router/pull/3199
  // scroll-behavior is not called on
  // load handled in views/Page.vue
  return new Promise((resolve, reject) => {
    // Options 1
    const options = {}

    if (!scrollTo) options.duration = 0

    window.requestAnimationFrame(async () => {
      vuetify.framework
        .goTo(scrollTo, options)
        .catch(reject)
        .finally(resolve)
    })
  })
}
