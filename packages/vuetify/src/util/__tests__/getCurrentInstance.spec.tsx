// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { getCurrentInstance } from '../getCurrentInstance'

describe('getCurrentInstance.ts', () => {
  it('should get and return current vm instance or throw error', () => {
    expect(
      () => getCurrentInstance('foobar')
    ).toThrow('[Vuetify] foobar must be called from inside a setup function')

    expect(
      () => mount({
        setup () {
          getCurrentInstance('foobar')

          return () => (<div></div>)
        },
      })
    ).not.toThrow('[Vuetify] foobar must be called from inside a setup function')
  })
})
