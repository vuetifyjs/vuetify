// Components
import { VTab, VTabs } from '..'

// Utilities
import { render, screen, showcase, userEvent } from '@test'
import { nextTick, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const FAKE_ITEMS = [
  { text: 'A', value: 1 },
  { text: 'B', value: 2 },
  { text: 'C', value: 3 },
]

const stories = {
  'With items': <VTabs items={ FAKE_ITEMS } />,
  'Without slider': <VTabs items={ FAKE_ITEMS } hideSlider />,
  Vertical: <VTabs items={ FAKE_ITEMS } direction="vertical" />,
}

describe('VTabs', () => {
  it('should respond to clicks', async () => {
    const update = vi.fn()
    render(() => (
      <VTabs onUpdate:modelValue={ update }>
        <VTab value="foo">foo</VTab>
        <VTab value="bar">bar</VTab>
      </VTabs>
    ))

    await userEvent.click(screen.getAllByCSS('.v-tab')[1])

    expect(update).toHaveBeenCalledTimes(2)
    expect(update).toHaveBeenNthCalledWith(1, 'foo')
    expect(update).toHaveBeenNthCalledWith(2, 'bar')
  })

  it('should respond to v-model changes', async () => {
    const model = ref('foo')
    render(() => (
      <VTabs modelValue={ model.value }>
        <VTab value="foo">foo</VTab>
        <VTab value="bar">bar</VTab>
      </VTabs>
    ))

    await nextTick()
    expect(screen.getAllByCSS('.v-tab')[0]).toHaveClass('v-tab--selected')

    model.value = 'bar'
    await nextTick()

    expect(screen.getAllByCSS('.v-tab')[0]).not.toHaveClass('v-tab--selected')
    expect(screen.getAllByCSS('.v-tab')[1]).toHaveClass('v-tab--selected')
  })

  it('should react to router changes', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: 'Home' } },
        { path: '/about', component: { template: 'About' } },
        { path: '/__vitest_test__/:path(.*)', component: { template: 'Test' } },
      ],
    })

    render(() => (
      <VTabs>
        <VTab to="/">foo</VTab>
        <VTab to="/about">bar</VTab>
      </VTabs>
    ), {
      global: {
        plugins: [router],
      },
    })

    await userEvent.click(screen.getAllByCSS('.v-tab')[1])

    expect(router.currentRoute.value.path).toBe('/about')

    await router.push('/')

    expect(screen.getAllByCSS('.v-tab')[0]).not.toHaveClass('v-tab--selected')
    expect(screen.getAllByCSS('.v-tab')[1]).toHaveClass('v-tab--selected')
  })

  // https://github.com/vuetifyjs/vuetify/issues/15237
  it('should not change model value if tab items are hidden with v-show', async () => {
    const model = ref('B')
    const show = ref(true)
    render(() => (
      <div v-show={ show }>
        <VTabs v-model={ model.value }>
          <VTab value="A">A</VTab>
          <VTab value="B">B</VTab>
          <VTab value="C">C</VTab>
        </VTabs>
      </div>
    ))

    expect(model.value).toBe('B')
    show.value = false
    expect(model.value).toBe('B')
    show.value = true
    expect(model.value).toBe('B')
  })

  showcase({ stories })
})
