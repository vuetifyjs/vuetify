/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="../../../types/cypress" />

// Utilities
import { defineComponent } from 'vue'
import { useGoTo } from '../goto'
import { useRender } from '@/util'

const ComponentA = defineComponent({
  setup () {
    const goTo = useGoTo()

    useRender(() => (
      <button id="top" onClick={ () => goTo('#bottom') }>Click me</button>
    ))

    return {}
  },
})

const ComponentB = defineComponent({
  setup () {
    const goTo = useGoTo()

    useRender(() => (
      <button id="bottom" onClick={ () => goTo('#top') }>Click me</button>
    ))

    return {}
  },
})

describe('goto', () => {
  it('should scroll vertical', () => {
    cy
      .mount(() => (
        <div>
          <div style="height: 1000px">
            <ComponentA />
          </div>

          <div style="height: 1000px">
            <ComponentB />
          </div>
        </div>
      ))
      .get('#top').click()
      .window().should(win => {
        expect(win.scrollY).to.equal(1000)
      })
      .get('#bottom').click()
      .window().should(win => {
        expect(win.scrollY).to.equal(0)
      })
  })
})
