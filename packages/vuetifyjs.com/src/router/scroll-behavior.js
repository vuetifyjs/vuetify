import goTo from 'vuetify/lib/components/Vuetify/util/goTo'
import { waitForReadystate } from '../util/helpers'

export default async function (to, from, savedPosition) {
  await waitForReadystate()

  let scrollTo = 0
  let options = {}

  if (to.hash) {
    scrollTo = to.hash
    options.offset = -80
  }

  if (savedPosition) {
    scrollTo = savedPosition.y
  }

  return new Promise(resolve => {
    setTimeout(() => {
      goTo(scrollTo, options)
      resolve()
    }, 100)
  })
}
