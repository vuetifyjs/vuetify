import Vue from 'vue'
import {
  mount,
} from '@vue/test-utils'
import {
  attachedRoot,
} from '../dom'

const FooComponent = Vue.extend({
  render (h) {
    return h('div', ['foo'])
  },
})

describe('dom', () => {
  it('should properly detect an element\'s root', () => {
    const shadowHost = document.createElement('div')
    expect(attachedRoot(shadowHost)).toBeNull()

    const shadowRoot = shadowHost.attachShadow({ mode: 'closed' })
    expect(attachedRoot(shadowRoot)).toBeNull()

    document.body.appendChild(shadowHost)
    expect(attachedRoot(shadowHost)).toBe(document)

    expect(attachedRoot(shadowRoot)).toBe(shadowRoot)

    const insideDiv = document.createElement('div')
    expect(attachedRoot(insideDiv)).toBeNull()

    shadowRoot.appendChild(insideDiv)
    expect(attachedRoot(insideDiv)).toBe(shadowRoot)
  })

  it('should detect the root of mounted components', () => {
    const attachedWrapper = mount(FooComponent, { attachToDocument: true })
    expect(attachedRoot(attachedWrapper.element)).toBe(document)

    const detachedWrapper = mount(FooComponent, { attachToDocument: false })
    expect(attachedRoot(detachedWrapper.element)).toBeNull()
  })
})
