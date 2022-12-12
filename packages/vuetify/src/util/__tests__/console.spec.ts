import { describe, expect, it } from '@jest/globals'
import { consoleError, consoleWarn } from '../console'

describe('console', () => {
  it('should generate a warning', () => {
    consoleWarn('foo')
    expect('[Vuetify] foo').toHaveBeenTipped()

    consoleWarn('bar', { __isVue: true, $options: { name: 'baz' } })
    expect('[Vuetify] bar\n\n(found in <Baz>)').toHaveBeenTipped()
  })

  it('should generate an error', () => {
    consoleError('foo')
    expect('[Vuetify] foo').toHaveBeenWarned()

    consoleError('bar', { __isVue: true, $options: { name: 'baz' } })
    expect('[Vuetify] bar\n\n(found in <Baz>)').toHaveBeenWarned()
  })
})
