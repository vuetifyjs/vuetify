/// <reference types="../../../../types/cypress" />

import VBadge from '../VBadge'
import { generate } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']
const props = {
  colors: defaultColors,
  textColors: defaultColors,
}

const stories = {
  'Default badge': <VBadge>Basic badge</VBadge>,
}

// Tests
describe('VBadge', () => {
  describe('bordered', () => {
    it('should have the bordered class applied when true', () => {
      cy.mount(<VBadge bordered>bordered</VBadge>)
        .get('.v-badge')
        .should('have.class', 'v-badge--bordered')
    })
  })

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

  describe('content', () => {
    it('renders text within the badge', () => {
      cy.mount(<VBadge content="badge content"></VBadge>)
        .get('.v-badge')
        .should('have.text', 'badge content')
    })
  })

  // TODO: Fix theme colors with dot prop
  describe('dot', () => {
    it('should have the dot class applied when true', () => {
      cy.mount(<VBadge color="red" dot>dot</VBadge>)
        .get('.v-badge')
        .should('have.class', 'v-badge--dot')
    })
  })

  describe('floating', () => {
    it('should have the floating class applied when true', () => {
      cy.mount(<VBadge color="red" floating>floating</VBadge>) // TODO: badge is slightly off screen
        .get('.v-badge')
        .should('have.class', 'v-badge--floating')
    })
  })

  describe('icon', () => {
    it('should render an icon inside', () => {
      cy.mount(<VBadge color="red" icon="mdi-vuetify">icon</VBadge>) // TODO: badge is slightly off screen
        .get('.v-badge')
        .should('contain.html', 'i')
        .get('i')
        .should('have.class', 'mdi-vuetify')
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
            expect(subject.querySelector(`.text-${defaultColors[idx]}`)).to.be.instanceOf(HTMLSpanElement)
            expect(subject).to.contain(defaultColors[idx])
          })
        })
    })
  })

  // TODO: Update testing to check for the tile class
  describe('tile', () => {
    it('should have the tile class applied when true', () => {
      cy.mount(<VBadge color="red" tile>tile</VBadge>)
        .get('.v-badge')
        .should('exist')
        .should('.v-badge--tile')
        .should('exist')
    })
  })
})

// Useful to preview all of the variants and pre-made examples
describe.skip('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
  generate({ stories, props, component: VBadge })
})
