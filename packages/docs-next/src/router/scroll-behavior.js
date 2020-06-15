// Utilities
import { waitForReadystate } from '../util/helpers'

// Globals
import { IN_BROWSER } from '@/util/globals'

export default async function (vuetify, to, _, savedPosition) {
  if (!IN_BROWSER) return

  let scrollTo = 0

  if (to.hash) scrollTo = to.hash
  else if (savedPosition) scrollTo = savedPosition.y

  await waitForReadystate()

  // TODO: https://github.com/vuejs/vue-router/pull/3199
  // scroll-behavior is not called on
  // load handled in views/Page.vue
  return new Promise((resolve, reject) => {
    window.requestAnimationFrame(async () => {
      vuetify.framework
        .goTo(scrollTo)
        .catch(reject)
        .finally(resolve)
    })
  })
}
