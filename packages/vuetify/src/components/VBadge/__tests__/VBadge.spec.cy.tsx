/// <reference types="../../../../types/cypress" />

import VBadge from '../VBadge'
import { generate } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']
const location = ['bottom-left', 'bottom-right', 'top-left', 'top-right']
const rounded = ['circle', 'pill', 'shaped', 'tr-xl', 'br-lg'] // TODO: fix pill
const props = {
  bordered: true,
  color: defaultColors,
  dot: true,
  icon: ['mdi-vuetify'],
  floating: true,
  offsetX: [8, -8, '12', '-12'],
  offsetY: [-6, 6, '10', '-10'],
  inline: true,
  location,
  modelValue: true,
  rounded,
}

const stories = {
  'Default badge': <VBadge />,
  'Icon badge': <VBadge icon="mdi-vuetify" />,
  'Text color': ( // TODO: update styling
    <div class="d-flex" style="gap: 3rem">
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
  // TODO: Remove remaining skipped tests
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

  describe.skip('content', () => {
    it('renders text within the badge', () => {
      cy.mount(<VBadge content="badge content" />)
        .get('.v-badge')
        .should('have.text', 'badge content')
    })
  })

  describe('label', () => {
    it('should have the floating class applied when true', () => {
      cy.mount(<VBadge label="label-badge">label</VBadge>)
        .get('.v-badge__badge')
        .should('have.attr', 'aria-label', 'label-badge')
    })
  })

  describe('max', () => {
    it('should add a suffix if the content value is greater', () => {
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
