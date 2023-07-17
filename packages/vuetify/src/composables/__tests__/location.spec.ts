// Composables
import { useLocation } from '../location'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

// Types
import { createVuetify } from '@/framework'

describe('location', () => {
  it.each([
    ['top', { top: 0, left: '50%', transform: 'translateX(-50%)' }],
    ['bottom', { bottom: 0, left: '50%', transform: 'translateX(-50%)' }],
    ['start', { left: 0, top: '50%', transform: 'translateY(-50%)' }],
    ['end', { right: 0, top: '50%', transform: 'translateY(-50%)' }],
    ['center', { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }],
    ['top start', { top: 0, left: 0 }],
  ] as const)('placement=%s', (...args) => {
    const [location, styles] = args
    mount({
      setup () {
        const { locationStyles } = useLocation({ location })

        expect(locationStyles.value).toEqual(styles)

        return () => {}
      },
    }, {
      global: {
        plugins: [createVuetify()],
      },
    })
  })
})
