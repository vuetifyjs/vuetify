// Composables
import { createDisplay } from '../display'

// Utilities
import { resizeWindow } from '@/../test/index'

const breakpoints = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'smAndDown',
  'smAndUp',
  'mdAndDown',
  'mdAndUp',
  'lgAndDown',
  'lgAndUp',
] as const

describe('display', () => {
  it.each([
    [
      {
        description: 'Huawei Smartwatch',
        width: 400,
        height: 400,
        name: 'xs',
      },
      [
        'xs',
        'smAndDown',
        'mdAndDown',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'Galaxy S5 (portrait)',
        width: 360,
        height: 640,
        name: 'xs',
      },
      [
        'xs',
        'smAndDown',
        'mdAndDown',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'Galaxy S5 (landscape)',
        width: 640,
        height: 360,
        name: 'sm',
      },
      [
        'sm',
        'smAndDown',
        'smAndUp',
        'mdAndDown',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'iPhone 6 (portrait)',
        width: 375,
        height: 667,
        name: 'xs',
      },
      [
        'xs',
        'smAndDown',
        'mdAndDown',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'iPhone 6 (landscape)',
        width: 667,
        height: 375,
        name: 'sm',
      },
      [
        'sm',
        'smAndDown',
        'smAndUp',
        'mdAndDown',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'iPad (portrait)',
        width: 768,
        height: 1024,
        name: 'sm',
      },
      [
        'sm',
        'smAndDown',
        'smAndUp',
        'mdAndDown',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'iPad (landscape)',
        width: 1024,
        height: 768,
        name: 'md',
      },
      [
        'md',
        'smAndUp',
        'mdAndDown',
        'mdAndUp',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'iPad Pro (portrait)',
        width: 1024,
        height: 1366,
        name: 'md',
      },
      [
        'md',
        'smAndUp',
        'mdAndDown',
        'mdAndUp',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'iPad Pro (landscape)',
        width: 1366,
        height: 1024,
        name: 'lg',
      },
      [
        'lg',
        'smAndUp',
        'mdAndUp',
        'lgAndDown',
        'lgAndUp',
      ],
    ],
    [
      {
        description: 'WSXGA+ (portrait)',
        width: 1050,
        height: 1680,
        name: 'md',
      },
      [
        'md',
        'smAndUp',
        'mdAndDown',
        'mdAndUp',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'WSXGA+ (landscape)',
        width: 1680,
        height: 1050,
        name: 'lg',
      },
      [
        'lg',
        'smAndUp',
        'mdAndUp',
        'lgAndDown',
        'lgAndUp',
      ],
    ],
    [
      {
        description: 'FHD (portrait)',
        width: 1080,
        height: 1920,
        name: 'md',
      },
      [
        'md',
        'smAndUp',
        'mdAndDown',
        'mdAndUp',
        'lgAndDown',
      ],
    ],
    [
      {
        description: 'FHD (landscape)',
        width: 1920,
        height: 1080,
        name: 'xl',
      },
      [
        'xl',
        'smAndUp',
        'mdAndUp',
        'lgAndUp',
      ],
    ],
    [
      {
        description: 'WQHD (portrait)',
        width: 1440,
        height: 2560,
        name: 'lg',
      },
      [
        'lg',
        'smAndUp',
        'mdAndUp',
        'lgAndDown',
        'lgAndUp',
      ],
    ],
    [
      {
        description: 'WQHD (landscape)',
        width: 2560,
        height: 1440,
        name: 'xl',
      },
      [
        'xl',
        'smAndUp',
        'mdAndUp',
        'lgAndUp',
      ],
    ],
  ])('should calculate breakpoint for %s', async (options, expected) => {
    await resizeWindow(options.width, options.height)

    const display = createDisplay()

    for (const breakpoint of breakpoints) {
      const expectedValue = expected.includes(breakpoint)

      expect(display[breakpoint].value).toBe(expectedValue)
    }
  })

  it('should override default thresholds', async () => {
    const { name } = createDisplay({
      thresholds: { sm: 400 },
    })

    await resizeWindow(400)
    expect(name.value).toBe('sm')

    await resizeWindow(399)
    expect(name.value).toBe('xs')
  })

  it('should allow breakpoint strings for mobileBreakpoint', async () => {
    const { mobile } = createDisplay({ mobileBreakpoint: 'lg' })

    await resizeWindow(1920)
    expect(mobile.value).toBe(false)

    await resizeWindow(600)
    expect(mobile.value).toBe(true)
  })
})
