/// <reference types="../../../../types/cypress" />

import { VBadge } from '..'
import { generate } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']
const location = ['bottom-start', 'bottom-end', 'top-start', 'top-end']
const rounded = ['circle', 'pill', 'shaped', 'tr-xl', 'br-lg', 0] // TODO: fix pill
const offset = [8, -8, '4', '-4', undefined]

const props = {
  bordered: true,
  color: defaultColors,
  content: ['content'],
  dot: true,
  icon: ['mdi-vuetify'],
  floating: true,
  inline: true,
  location,
  modelValue: true,
  rounded,
}

const stories = {
  'Default badge': <VBadge />,
  'Icon badge': <VBadge icon="mdi-vuetify" />,
  'Offset badge': (
    <div class="d-flex flex-column" style="gap: 0.8rem">
      { ['offsetX', 'offsetY'].map(key => (
        <>
          <h5>{ key }</h5>
          <div class="d-flex" style="gap: 1.3rem">
            { offset.map(val => (
              <VBadge {...{ [key]: val }} content={ `${val}` }>
                <button class="v-btn v-btn--size-default v-btn--variant-contained">
                  { key }
                </button>
              </VBadge>
            )) }
          </div>
        </>
      )) }
    </div>
  ),
  'Text color': (
    <div class="d-flex flex-row" style="gap: 0.8rem">
      { defaultColors.map((color, idx) => (
        <>
          <div class="d-flex" style="gap: 0.8rem">
            <VBadge textColor={ color } content={ idx.toString() }>
              <button class="v-btn v-btn--size-default v-btn--variant-contained">
                { color }
              </button>
            </VBadge>
          </div>
        </>
      )) }
    </div>
  ),
}

// Tests
describe('VBadge', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          {defaultColors.map((color, idx) => (
            <VBadge color={ color } content={ idx.toString() }>
              { color } badge
            </VBadge>
          )) }
        </>
      ))
        .get('.v-badge')
        .should('have.length', defaultColors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, idx) => {
            // TODO: refactor
            expect(subject.querySelector(`.bg-${defaultColors[idx]}`)).to.be.instanceOf(HTMLSpanElement)
            expect(subject).to.contain(defaultColors[idx])
          })
        })
    })
  })

  describe('label', () => {
    it('should have the designated aria label', () => {
      cy.mount(<VBadge label="label-badge">label</VBadge>)
        .get('.v-badge__badge')
        .should('have.attr', 'aria-label', 'label-badge')
    })
  })

  describe('max', () => {
    it('should add a suffix if the content value is greater than the max value', () => {
      cy.mount(<VBadge content="1000" max="999" />)
        .get('.v-badge')
        .should('contain.text', '+')
    })
  })

  describe('tag', () => {
    it('renders the proper tag instead of a div', () => {
      cy.mount(<VBadge tag="custom-tag">tag</VBadge>)
        .get('custom-tag')
        .should('have.text', 'tag')
    })
  })

  describe('textColor', () => {
    it('supports default text color props', () => {
      cy.mount(() => (
        <>
          {defaultColors.map((color, idx) => (
            <VBadge textColor={ color } content={ idx.toString() }>
              { color } text badge
            </VBadge>
          )) }
        </>
      ))
        .get('.v-badge')
        .should('have.length', defaultColors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, idx) => {
            // TODO: refactor
            expect(subject.querySelector(`.text-${defaultColors[idx]}`)).to.be.instanceOf(HTMLSpanElement)
            expect(subject).to.contain(defaultColors[idx])
          })
        })
    })
  })
})

// Useful to preview all of the variants and pre-made examples
describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
  generate({ stories, props, component: VBadge })
})
