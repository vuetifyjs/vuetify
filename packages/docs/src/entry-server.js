import { createApp } from './main'

// ENV Variables
require('dotenv').config()

global.fetch = require('node-fetch')

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  /* eslint-disable-next-line no-async-promise-executor */
  return new Promise(async (resolve, reject) => {
    const s = isDev && Date.now()
    const {
      app,
      router,
      store,
    } = await createApp(undefined, context)

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
        matchedComponents.map(c => {
          return c.asyncData
            ? c.asyncData({
              store,
              route: router.currentRoute,
            }).catch(e => e)
            : Promise.resolve()
        })
      ).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state

        resolve(app)
      })
    }, reject)
  })
}
