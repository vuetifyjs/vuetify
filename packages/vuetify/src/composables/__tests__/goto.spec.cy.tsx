/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="../../../types/cypress" />

// Utilities
import { defineComponent } from 'vue'
import { useGoTo } from '../goto'
import { useRender } from '@/util'

const ComponentA = defineComponent({
  props: {
    id: String,
    target: String,
  },

  setup (props) {
    const goTo = useGoTo()

    function onClick () {
      return goTo(props.target!)
    }

    useRender(() => (
      <button id={ props.id } onClick={ onClick }>Click me</button>
    ))

    return {}
  },
})

const ComponentB = defineComponent({
  props: {
    id: String,
    target: String,
    container: String,
  },

  setup (props) {
    const goTo = useGoTo()

    function onClick () {
      return goTo.horizontal(props.target!, { container: props.container })
    }

    useRender(() => (
      <button id={ props.id } onClick={ onClick }>Click me</button>
    ))

    return {}
  },
})

describe('goto', () => {
  it('should scroll vertical', () => {
    cy
      .mount(() => (
        <div>
          <ComponentA id="top" target="#bottom" />

          <div style="height: 2000px;" />

          <ComponentA id="bottom" target="#top" />
        </div>
      ))
      .get('#top').click()
      .window().should(win => {
        expect(win.scrollY).to.equal(1223)
      })
      .get('#bottom').click()
      .window().should(win => {
        expect(win.scrollY).to.equal(0)
      })
  })

  // TODO: find a better way to test this and fix in CI
  it.skip('should scroll horizontal', () => {
    cy
      .mount(() => (
        <div id="container" style="overflow-x: auto;">
          <ComponentB id="start" target="#end" container="parent" />

          <ComponentB id="end" target="#start" container="parent" style="margin-inline-start: 2000px;" />
        </div>
      ))
      .get('#start').click()
      .wait(500)
      .get('#container').then($el => {
        expect($el[0].scrollLeft).to.equal(975)
      })
      .get('#end').click()
      .wait(500)
      .get('#container').then($el => {
        expect($el[0].scrollLeft).to.equal(0)
      })
  })
})
