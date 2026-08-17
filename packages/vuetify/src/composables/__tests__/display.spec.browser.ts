// Composables
import { createDisplay, useDisplay } from '../display'

// Utilities
import { page, render } from '@test'
import {
  defineComponent,
  effectScope,
  h,
} from 'vue'

// Types
import type { DisplayBreakpoint } from '@/composables/display'

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
  ])('should calculate breakpoint for $description', async (options, expected) => {
    await page.viewport(options.width, options.height)

    const scope = effectScope()
    const display = scope.run(() => createDisplay())!

    const matched = breakpoints.reduce<(typeof breakpoints[number])[]>((acc, breakpoint) => {
      if (display[breakpoint].value) acc.push(breakpoint)
      return acc
    }, [])

    expect(matched).toEqual(expected)
  })

  it('should override default thresholds', async () => {
    // Default sm is 600. Override to 400.
    // At 500px, default would be xs but custom should be sm.
    await page.viewport(500, 900)

    const scope = effectScope()
    const { name } = scope.run(() => createDisplay({
      thresholds: { sm: 400 },
    }))!

    expect(name.value).toBe('sm')

    scope.stop()

    // At 300px, both default and custom are xs.
    await page.viewport(300, 900)

    const scope2 = effectScope()
    const display2 = scope2.run(() => createDisplay({
      thresholds: { sm: 400 },
    }))!

    expect(display2.name.value).toBe('xs')

    scope2.stop()
  })

  it('should allow breakpoint strings for mobileBreakpoint', async () => {
    const scope = effectScope()
    const { mobile } = scope.run(() => createDisplay({ mobileBreakpoint: 'lg' }))!

    await page.viewport(1920, 900)
    await expect.poll(() => mobile.value).toBe(false)

    await page.viewport(600, 900)
    await expect.poll(() => mobile.value).toBe(true)
  })

  it('should resolve per-component numeric mobileBreakpoint via matchMedia', async () => {
    const MobileProbe = defineComponent({
      props: {
        mobileBreakpoint: { type: [Number, String], required: true },
      },
      setup (props) {
        const { mobile } = useDisplay(props as { mobile: null, mobileBreakpoint: number | DisplayBreakpoint })

        return () => String(mobile.value)
      },
    })

    const view = render(() => h(MobileProbe, { mobileBreakpoint: 800 }))

    const text = () => view.container.textContent?.trim()

    await page.viewport(1920, 900)
    await expect.poll(text).toBe('false')

    await page.viewport(600, 900)
    await expect.poll(text).toBe('true')

    await page.viewport(900, 900)
    await expect.poll(text).toBe('false')
  })

  it('should fall through to display.mobile.value when mobileBreakpoint is not set', async () => {
    const Probe = defineComponent({
      setup () {
        const { mobile } = useDisplay({ mobile: null })

        return () => String(mobile.value)
      },
    })

    await page.viewport(600, 900)
    const view = render(() => h(Probe))

    const text = () => view.container.textContent?.trim()

    await expect.poll(text).toBe('true')

    await page.viewport(1920, 900)
    await expect.poll(text).toBe('false')
  })
})
