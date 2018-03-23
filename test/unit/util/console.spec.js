import { test } from '@/test'
import { consoleWarn, consoleError } from '@/util/console'

test('console.js', () => {
  it('should generate a warning', () => {
    consoleWarn('foo')
    expect('[Vuetify] foo').toHaveBeenTipped()

    consoleWarn('bar', { $options: { name: 'baz' } })
    expect('[Vuetify] bar in "baz"').toHaveBeenTipped()
  })

  it('should generate an error', () => {
    consoleError('foo')
    expect('[Vuetify] foo').toHaveBeenWarned()

    consoleError('bar', { $options: { name: 'baz' } })
    expect('[Vuetify] bar in "baz"').toHaveBeenWarned()
  })
})
