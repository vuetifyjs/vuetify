/// <reference types="../../../types/cypress" />

import VBtn from './VBtn'
import { byExample, byProps } from '@/../cypress/templates'

const loadingText = 'Loading'
const anchor = {
  href: '#my-anchor',
  hash: 'my-anchor',
}

// TODO: generate these from types
const colors = ['success', 'info', 'warning', 'error', 'invalid']
const sizes = ['x-small', 'small', 'default', 'large', 'x-large']
const props = {
  color: colors,
  size: sizes,
  disabled: false,
  plain: false,
  loading: false,
  icon: true,
}

const stories = {
  'Default button': <VBtn>Basic button</VBtn>,
  'Small success button': <VBtn color="success" size="small">Completed!</VBtn>,
  'Large, plain button w/ error': <VBtn color="error" plain size="large">Whoops</VBtn>,
  'Loading button': <VBtn loading v-slot={ { loader: <span>Loading...</span> } }></VBtn>,
  Icon: <VBtn icon color="pink"></VBtn>,
}

describe('VBtn', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          {colors.map(color => (
            <VBtn color={ color } class="text-capitalize">
              { color } button
            </VBtn>
          )) }
        </>
      ))
        .get('button')
        .should('have.length', colors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, idx) => {
            expect(subject).to.contain(colors[idx])
          })
        })
    })
  })

  describe('icons', () => {
    it('adds the icon class when true', () => {
      cy.mount(<VBtn icon></VBtn>)
        .get('button')
        .should('have.class', 'v-btn--icon')
    })

    it('renders an icon inside', () => {
      // TODO: Render VIcon instead of emoji
      cy.mount(<VBtn icon><span style="font-size: 1.5rem;">🐻</span></VBtn>)
        .get('button')
        .should('have.text', '🐻')
    })
  })

  describe('plain', () => {
    it('should have the plain class when plain prop is set to true', () => {
      cy.mount(<VBtn plain>Plain</VBtn>)
        .get('button')
        .should('have.class', 'v-btn--plain')
    })
  })

  describe('tag', () => {
    it('renders the proper tag instead of a button', () => {
      cy.mount(<VBtn tag="custom-tag">Click me</VBtn>)
        .get('button')
        .should('not.exist')
        .get('custom-tag')
        .should('have.text', 'Click me')
    })
  })

  describe('elevation', () => {
    it('should have the correct elevation', () => {
      cy.mount(<VBtn elevation={ 24 } />)
        .get('button')
        .should('have.class', 'elevation-24')
    })
  })

  describe('events', () => {
    it('emits native click events', () => {
      const click = cy.stub().as('click')
      cy.mount(<VBtn onClick={ click }>Click me</VBtn>)
        .get('button')
        .click()
        .get('@click')
        .should('have.been.called', 1)
        .setProps({ href: undefined, to: '#my-anchor' })
        .get('@click')
        .should('have.been.called', 2)
    })

    // Pending test, is "toggle" even going to be emitted anymore?
    it.skip('emits toggle when used within a button group', () => {
      // const register = jest.fn()
      // const unregister = jest.fn()
      // const toggle = jest.fn()
      // const wrapper = mountFunction({
      //   provide: {
      //     btnToggle: { register, unregister },
      //   },
      //   methods: { toggle },
      // })

      // wrapper.trigger('click')
      // expect(toggle).toHaveBeenCalled()
    })
  })

  // These tests were copied over from the previous Jest tests,
  // but they are breaking because the features have not been implemented

  describe.skip('disabled', () => {
    // The actual behavior here is working, but the color class name isn't being removed
    // We can _technically_ test that the background is NOT the color's background,
    // but it's a bit brittle and I think it'll be better to check against the class name
    it('should not add color classes if disabled', () => {
      cy.mount(<VBtn color="success" disabled></VBtn>)
        .get('button')
        .should('have.class', 'bg-success')
        .get('button')
        .should('have.class', 'v-btn--disabled')
        .should('not.have.class', 'bg-success')
    })
  })

  describe.skip('activeClass', () => {
    it('should use custom active-class', () => {
      cy.mount(<VBtn activeClass="my-active-class">Active Class</VBtn>)
        .get('.my-active-class')
        .should('exist')
    })
  })

  describe('retainFocusOnClick', () => {
    it('when true, the button has focus', () => {
      cy.mount(<VBtn retainFocusOnClick>My button</VBtn>)
        .get('button')
        .click()
        .should('have.focus')
    })

    it.skip('when false, the button does not capture focus', () => {
      cy.mount(<VBtn retainFocusOnClick={ false }>My button</VBtn>)
        .get('button')
        .click()
        .should('not.have.focus')
    })
  })

  describe('loading', () => {
    it('when using the loader slot, do not show the progress indicator', () => {
      cy.mount(() => (
        <VBtn loading v-slots={ { loader: () => <span>{ loadingText }</span> } } />
      ))
        .get('button')
        .should('contain.text', loadingText)
        .get('role[progressbar]')
        .should('not.exist')
    })

    // custom loaders are not yet implemented
    it.skip('when loading is true, show the progress indicator', () => {
      cy.mount(<VBtn loading>{ loadingText }</VBtn>)
        .get('button')
        .should('contain.text', loadingText)
        .get('role[progressbar]')
        .should('be.visible')
    })
  })

  // v-btn--tile isn't implemented at all
  describe.skip('tile', () => {
    it('applies the tile class when true', () => {
      cy.mount(<VBtn tile />)
        .get('button')
        .should('contain.class', 'v-btn--tile')
    })

    it('does not apply the tile class when false', () => {
      cy.mount(<VBtn tile={ false } />)
        .get('button')
        .should('not.contain.class', 'v-btn--tile')
    })
  })

  describe.skip('href', () => {
    it('should render an <a> tag when using href prop', () => {
      cy.mount(<VBtn href={ anchor.href }>Click me</VBtn>)
        .get('button')
        .click()
        .get('a') // currently not rendering the <a> tag at all
        .should('contain.text', 'Click me')
        .should('have.focus')
        .hash()
        .should('contain', anchor.hash)
    })
  })

  describe.skip('value', () => {
    // none of the "value" props are implemented yet
    it('should stringify non string|number values', () => {
      const objectValue = { value: { hello: 'world' } }
      const numberValue = { value: 2 }

      cy.mount(<VBtn value={ objectValue }></VBtn>)
        .get('button')
        .should('contain.text', JSON.stringify(objectValue, null, 0))
        .mount(<VBtn value={ numberValue } />)
        .get('button')
        .should('contain.text', numberValue.value)
    })
  })

  // I think there's an issue with setProps,
  // _or_ the prod code isn't working
  describe.skip('Reactivity', () => {
    it('tile', () => {
      cy.mount(<VBtn tile>My button</VBtn>)
        .get('button')
        .should('contain.class', 'v-btn--tile')
        .setProps({ tile: false })
        .should('not.contain.class', 'v-btn--tile')
    })

    it('disabled', () => {
      cy.mount(<VBtn color="success" disabled></VBtn>)
        .setProps({ disabled: false })
        .get('button')
        .should('not.have.class', 'v-btn--disabled')
    })

    it('activeClass', () => {
      cy.mount(<VBtn activeClass="my-active-class">Active Class</VBtn>)
        .setProps({ activeClass: 'different-class' })
        .get('.different-class')
        .should('not.exist')
    })

    it('plain', () => {
      cy.mount(<VBtn plain>Plain</VBtn>)
        .get('button')
        .should('have.class', 'v-btn--plain')
        .setProps({ plain: false })
        .get('button')
        .should('not.have.class', 'v-btn--plain')
    })

    it('retainFocusOnClick', () => {
      cy.mount(<VBtn retainFocusOnClick>My button</VBtn>)
        .get('button')
        .click()
        .should('have.focus')
        .get('body')
        .click('bottomRight')
        .setProps({ retainFocusOnClick: false })
        .get('button')
        .click()
        .should('not.have.focus')
    })
  })
})

describe.skip('Showcase', () => {
  describe('Examples', () => {
    byExample(stories)
  })

  describe('Props', () => {
    byProps(props, VBtn)
  })
})

/**
  * These are pending tests copied over from the original Jest suite.
  * They need to be reimplemented.
  * Some of this functionality may currently be broken
  */

describe.skip('router', () => {
  // it('should toggle on route change if provided a to prop', async () => {
  //   const toggle = jest.fn()
  //   const register = jest.fn()
  //   const unregister = jest.fn()
  //   const wrapper = mountFunction({
  //     provide: {
  //       btnToggle: {
  //         activeClass: 'foobar',
  //         register,
  //         unregister,
  //       },
  //     },
  //     methods: { toggle },
  //     ref: 'link',
  //   })

  //   router.push('/foobar')

  //   await wrapper.vm.$nextTick()
  //   expect(toggle).not.toHaveBeenCalled()

  //   wrapper.setProps({ to: 'fizzbuzz' })

  //   router.push('/fizzbuzz')

  //   await wrapper.vm.$nextTick()
  //   expect(toggle).toHaveBeenCalled()
  // })
})
