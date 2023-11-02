/// <reference types="../../../../types/cypress" />

// Components
import { VBadge } from '..'
import { VBtn } from '@/components/VBtn'

// Utilities
import { generate, gridOn } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']
const location = ['bottom start', 'bottom end', 'top start', 'top end']
const rounded = ['circle', 'pill', 'shaped', 'tr-xl', 'br-lg', 0] // TODO: fix pill
const offset = [8, -8, '4', '-4', undefined]

const props = {
  bordered: true,
  color: defaultColors,
  content: ['content'],
  dot: true,
  icon: ['$vuetify'],
  floating: true,
  inline: true,
  location,
  modelValue: true,
  rounded,
}

const stories = {
  'Default badge': <VBadge />,
  'Icon badge': <VBadge icon="$vuetify" />,
  'Offset badge': gridOn(['offsetX', 'offsetY'], offset, (xy, offset) => (
      <VBadge { ...{ [xy]: offset } } content={ `${offset}` }>
        <VBtn>
          { xy }
        </VBtn>
      </VBadge>
  )),
  'Text color': gridOn(defaultColors, [null], color => (
    <VBadge textColor={ color } content={ color }>
      <VBtn>
        { color }
      </VBtn>
    </VBadge>
  )),
}

// Tests
describe('VBadge', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          { defaultColors.map((color, idx) => (
            <VBadge color={ color } content={ idx.toString() }>
              { color } badge
            </VBadge>
          ))}
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
          { defaultColors.map((color, idx) => (
            <VBadge textColor={ color } content={ idx.toString() }>
              { color } text badge
            </VBadge>
          ))}
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

  describe('Showcase', () => {
    generate({ stories, props, component: VBadge })
  })
})
