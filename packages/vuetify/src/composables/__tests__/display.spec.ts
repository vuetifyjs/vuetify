// Composables
import { createDisplay } from '../display'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { resizeWindow } from '@/../test/index'

const breakpoints = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  'smAndDown',
  'smAndUp',
  'mdAndDown',
  'mdAndUp',
  'lgAndDown',
  'lgAndUp',
  'xlAndDown',
  'xlAndUp',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
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
        'xlAndDown',
        'xlAndUp',
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
        'xlAndDown',
      ],
    ],
    [
      {
        description: 'WQHD (landscape)',
        width: 2560,
        height: 1440,
        name: 'xxl',
      },
      [
        'xxl',
        'smAndUp',
        'mdAndUp',
        'lgAndUp',
        'xlAndUp',
      ],
    ],
  ])('should calculate breakpoint for %s', async (options, expected) => {
    await resizeWindow(options.width, options.height)

    const display = createDisplay()

    const matched = breakpoints.reduce<(typeof breakpoints[number])[]>((acc, breakpoint) => {
      if (display[breakpoint].value) acc.push(breakpoint)
      return acc
    }, [])

    expect(matched).toEqual(expected)
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
