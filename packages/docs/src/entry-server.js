// Imports
import { createApp } from './main'

const path = require('path')
const resolve = file => path.resolve(__dirname, file)

// ENV Variables
require('dotenv').config({ path: resolve('../.env.local') })

global.fetch = require('node-fetch')

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  /* eslint-disable-next-line no-async-promise-executor */
  return new Promise(async (resolve, reject) => {
    let app
    let router
    let store

    try {
      const res = await createApp(undefined, context)

      app = res.app
      router = res.router
      store = res.store
    } catch (e) {
      console.log('error in server try')

      reject(e)
    }

    // set router's location
    router.push(context.url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(
        matchedComponents.map(async c => {
          try {
            const asyncData = c._Ctor[0].options.asyncData
            await asyncData({
              route: router.currentRoute,
              store,
            })
          } catch (e) {
            return Promise.resolve(e)
          }
        }),
      ).then(() => {
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state

        // Inject vue-meta into template
        context.meta = app.$meta()

        resolve(app)
      }).catch(e => {
        console.log('missing route break server')

        reject(e)
      })
    }, reject)
  })
}
