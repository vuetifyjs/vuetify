// Components
import { VAppBar } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, defineComponent, nextTick, Suspense } from 'vue'
import { createVuetify } from '@/framework'

describe('VAppBar', () => {
  it('server-renders its size into the layout before mount', async () => {
    const app = createSSRApp(() => (
      <VLayout>
        <VAppBar height={ 64 } />
        <VMain />
      </VLayout>
    ))
    app.use(createVuetify())

    const html = await renderToString(app)

    expect(html).toContain('--v-layout-top:64px')
  })

  it('keeps hydrated layout sizes while a Suspense dependency is pending', async () => {
    let release!: () => void
    let hydrating = false
    const Page = defineComponent({
      name: 'Page',
      async setup () {
        if (hydrating) await new Promise<void>(resolve => release = resolve)
        return () => <div />
      },
    })
    const App = defineComponent({
      name: 'App',
      setup () {
        return () => (
          <VLayout>
            <Suspense>
              <div>
                <VAppBar height={ 64 } />
                <VMain>
                  <Page />
                </VMain>
              </div>
            </Suspense>
          </VLayout>
        )
      },
    })

    const ssrApp = createSSRApp(App)
    ssrApp.use(createVuetify())
    const container = document.createElement('div')
    container.innerHTML = await renderToString(ssrApp)

    hydrating = true
    const app = createSSRApp(App)
    app.use(createVuetify())
    app.mount(container)
    await nextTick()

    const main = container.querySelector('.v-main') as HTMLElement
    expect(main.style.getPropertyValue('--v-layout-top')).toBe('64px')

    release()
    await nextTick()
    await nextTick()

    expect(main.style.getPropertyValue('--v-layout-top')).toBe('64px')

    app.unmount()
  })
})
