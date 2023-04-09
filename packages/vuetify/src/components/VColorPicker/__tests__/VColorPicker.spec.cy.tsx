/* eslint-disable sonarjs/no-identical-functions */
/// <reference types="../../../../types/cypress" />

import { VColorPicker } from '../VColorPicker'
import { Application } from '@/../cypress/templates'

describe('VColorPicker', () => {
  it('should should render correctly in dark theme', () => {
    cy.mount(() => (
      <Application theme="dark">
        <VColorPicker />
      </Application>
    ))

    cy.get('.v-color-picker').should('exist')
  })

  it('should should render correctly in rtl locale', () => {
    cy.mount(() => (
      <Application rtl>
        <VColorPicker />
      </Application>
    ))

    cy.get('.v-color-picker').should('exist')
  })

  it('should show swatches', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker showSwatches />
      </Application>
    ))

    cy.get('.v-color-picker-swatches').should('exist')
  })

  it('should hide inputs', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker hideInputs />
      </Application>
    ))

    cy.get('.v-color-picker-edit').should('not.exist')
  })

  it('should hide canvas', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker hideCanvas />
      </Application>
    ))

    cy.get('.v-color-picker-canvas').should('not.exist')
  })

  it('should hide preview and sliders', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker hideSliders />
      </Application>
    ))

    cy.get('.v-color-picker-preview').should('not.exist')
  })

  it('should support elevation', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker elevation="0" />
      </Application>
    ))

    cy.get('.v-color-picker').should('have.class', 'elevation-0')
  })

  it('should support rounded', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker rounded="0" />
      </Application>
    ))

    cy.get('.v-color-picker').should('have.class', 'rounded-0')
  })

  it('should default to emitting hex value if no value is provided', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker />
      </Application>
    ))

    cy.get('.v-color-picker-canvas canvas')
      .then(canvas => {
        const width = canvas.width() ?? 0
        const height = canvas.height() ?? 0

        cy.wrap(canvas).click(width / 2, height / 2)
      })
    cy.emitted(VColorPicker, 'update:modelValue')
      .should('have.length', 1)
      .then(arr => expect(arr[0][0]).to.match(/^#[A-F0-9]{6}$/))
  })

  it('should emit hexa value if hexa value is provided', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker modelValue="#ff00ff00" />
      </Application>
    ))

    cy.get('.v-color-picker-canvas canvas')
      .then(canvas => {
        const width = canvas.width() ?? 0
        const height = canvas.height() ?? 0

        cy.wrap(canvas).click(width / 2, height / 2)
      })
    cy.emitted(VColorPicker, 'update:modelValue')
      .should('have.length', 1)
      .then(arr => expect(arr[0][0]).to.match(/^#[A-F0-9]{8}$/))
  })

  it('should emit hex value if hex value is provided', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker modelValue="#ff00ff" />
      </Application>
    ))

    cy.get('.v-color-picker-canvas canvas')
      .then(canvas => {
        const width = canvas.width() ?? 0
        const height = canvas.height() ?? 0

        cy.wrap(canvas).click(width / 2, height / 2)
      })
    cy.emitted(VColorPicker, 'update:modelValue')
      .should('have.length', 1)
      .then(arr => expect(arr[0][0]).to.match(/^#[A-F0-9]{6}$/))
  })

  it('should emit hsla value if hsla value is provided', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker modelValue={{ h: 100, s: 0, l: 1, a: 1 }} />
      </Application>
    ))

    cy.get('.v-color-picker-canvas canvas')
      .then(canvas => {
        const width = canvas.width() ?? 0
        const height = canvas.height() ?? 0

        cy.wrap(canvas).click(width / 2, height / 2)
      })
    cy.emitted(VColorPicker, 'update:modelValue')
      .should('have.length', 1)
      .then(emits => {
        expect(emits[0][0]).to.haveOwnProperty('h')
        expect(emits[0][0]).to.haveOwnProperty('s')
        expect(emits[0][0]).to.haveOwnProperty('l')
        expect(emits[0][0]).to.haveOwnProperty('a')
      })
  })

  it('should emit rgba value if rgba value is provided', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker modelValue={{ r: 100, g: 20, b: 100, a: 1 }} />
      </Application>
    ))

    cy.get('.v-color-picker-canvas canvas')
      .then(canvas => {
        const width = canvas.width() ?? 0
        const height = canvas.height() ?? 0

        cy.wrap(canvas).click(width / 2, height / 2)
      })
    cy.emitted(VColorPicker, 'update:modelValue')
      .should('have.length', 1)
      .then(emits => {
        expect(emits[0][0]).to.haveOwnProperty('r')
        expect(emits[0][0]).to.haveOwnProperty('g')
        expect(emits[0][0]).to.haveOwnProperty('b')
        expect(emits[0][0]).to.haveOwnProperty('a')
      })
  })

  it('should hide mode switch if only one mode is enabled', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker modes={['rgba']} />
      </Application>
    ))

    cy.get('.v-color-picker-edit > .v-btn').should('not.exist')
  })

  it('should hide alpha slider if mode does not include alpha', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker modes={['rgb']} modelValue="#ff00ff" />
      </Application>
    ))

    cy.get('.v-color-picker-preview__alpha').should('not.exist')
  })

  it('should emit value when changing hue slider', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker modelValue="#000ff" />
      </Application>
    ))

    cy.get('.v-color-picker-preview__hue')
      .then(slider => {
        const width = slider.width() ?? 0
        const height = slider.height() ?? 0

        cy.wrap(slider).click(width / 2, height / 2)
      })
    cy.emitted(VColorPicker, 'update:modelValue')
      .then(emits => expect(emits[0][0]).to.not.equal('#0000ff'))
  })

  it('should emit value when changing alpha slider', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker modelValue="#000ff" />
      </Application>
    ))

    cy.get('.v-color-picker-preview__alpha')
      .then(slider => {
        const width = slider.width() ?? 0
        const height = slider.height() ?? 0

        cy.wrap(slider).click(width / 2, height / 2)
      })
    cy.emitted(VColorPicker, 'update:modelValue')
      .then(emits => expect(emits[0][0]).to.not.equal('#0000ff'))
  })

  it('should emit value when clicking on swatch', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker showSwatches />
      </Application>
    ))

    cy.get('.v-color-picker-swatches__swatch').eq(4)
      .find('.v-color-picker-swatches__color').eq(0).as('color')
      .click()
    cy.get('@color').find('.v-icon').should('exist')
    cy.emitted(VColorPicker, 'update:modelValue')
      .should('have.length', 1)
  })

  it('should not use global defaults for slider color', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker />
      </Application>
    ), null, {
      defaults: {
        VSlider: {
          color: 'primary',
          trackColor: 'primary',
          trackFillColor: 'primary',
        },
      },
    })

    cy.get('.bg-primary').should('not.exist')
    cy.get('.text-primary').should('not.exist')
  })

  it('should not show dot or input values if no color is set', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker />
      </Application>
    ))

    cy.get('.v-color-picker-canvas__dot').should('not.exist')
    cy.get('.v-color-picker-edit__input input').should('have.value', '')
    cy.get('.v-color-picker-canvas canvas').then(canvas => {
      const width = canvas.width() ?? 0
      const height = canvas.height() ?? 0

      cy.wrap(canvas).click(width / 2, height / 2)
    })
    cy.get('.v-color-picker-canvas__dot').should('exist')
    cy.get('.v-color-picker-edit__input input').invoke('val').should('not.be.empty')
  })

  it('should emit correct color when typing in hex field', () => {
    cy.mount(() => (
      <Application>
        <VColorPicker mode="hexa" />
      </Application>
    ))

    cy.get('.v-color-picker-edit__input input').as('input')
      .type('FF00CC')
    cy.get('@input').blur()
    cy.emitted(VColorPicker, 'update:modelValue')
      .should('deep.equal', [['#FF00CC']])
  })
})
