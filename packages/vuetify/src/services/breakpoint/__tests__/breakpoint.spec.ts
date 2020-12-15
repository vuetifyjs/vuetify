import { resizeWindow } from '../../../../test'
import { Breakpoint } from '../'
import { preset } from '../../../presets/default'

describe('Breakpoint.ts', () => {
  let breakpoint: Breakpoint
  const scenarios = [
    {
      description: 'Huawei Smartwatch',
      width: 400,
      height: 400,
      name: 'xs',
      mustBeTrue: [
        'xs',
        'xsOnly',
        'smAndDown',
        'mdAndDown',
        'lgAndDown',
      ],
    },
    {
      description: 'Galaxy S5 (portrait)',
      width: 360,
      height: 640,
      name: 'xs',
      mustBeTrue: [
        'xs',
        'xsOnly',
        'smAndDown',
        'mdAndDown',
        'lgAndDown',
      ],
    },
    {
      description: 'Galaxy S5 (landscape)',
      width: 640,
      height: 360,
      name: 'sm',
      mustBeTrue: [
        'sm',
        'smOnly',
        'smAndDown',
        'smAndUp',
        'mdAndDown',
        'lgAndDown',
      ],
    },
    {
      description: 'iPhone 6 (portrait)',
      width: 375,
      height: 667,
      name: 'xs',
      mustBeTrue: [
        'xs',
        'xsOnly',
        'smAndDown',
        'mdAndDown',
        'lgAndDown',
      ],
    },
    {
      description: 'iPhone 6 (landscape)',
      width: 667,
      height: 375,
      name: 'sm',
      mustBeTrue: [
        'sm',
        'smOnly',
        'smAndDown',
        'smAndUp',
        'mdAndDown',
        'lgAndDown',
      ],
    },
    {
      description: 'iPad (portrait)',
      width: 768,
      height: 1024,
      name: 'sm',
      mustBeTrue: [
        'sm',
        'smOnly',
        'smAndDown',
        'smAndUp',
        'mdAndDown',
        'lgAndDown',
      ],
    },
    {
      description: 'iPad (landscape)',
      width: 1024,
      height: 768,
      name: 'md',
      mustBeTrue: [
        'md',
        'mdOnly',
        'smAndUp',
        'mdAndDown',
        'mdAndUp',
        'lgAndDown',
      ],
    },
    {
      description: 'iPad Pro (portrait)',
      width: 1024,
      height: 1366,
      name: 'md',
      mustBeTrue: [
        'md',
        'mdOnly',
        'smAndUp',
        'mdAndDown',
        'mdAndUp',
        'lgAndDown',
      ],
    },
    {
      description: 'iPad Pro (landscape)',
      width: 1366,
      height: 1024,
      name: 'lg',
      mustBeTrue: [
        'lg',
        'lgOnly',
        'smAndUp',
        'mdAndUp',
        'lgAndDown',
        'lgAndUp',
      ],
    },
    {
      description: 'WSXGA+ (portrait)',
      width: 1050,
      height: 1680,
      name: 'md',
      mustBeTrue: [
        'md',
        'mdOnly',
        'smAndUp',
        'mdAndDown',
        'mdAndUp',
        'lgAndDown',
      ],
    },
    {
      description: 'WSXGA+ (landscape)',
      width: 1680,
      height: 1050,
      name: 'lg',
      mustBeTrue: [
        'lg',
        'lgOnly',
        'smAndUp',
        'mdAndUp',
        'lgAndDown',
        'lgAndUp',
      ],
    },
    {
      description: 'FHD (portrait)',
      width: 1080,
      height: 1920,
      name: 'md',
      mustBeTrue: [
        'md',
        'mdOnly',
        'smAndUp',
        'mdAndDown',
        'mdAndUp',
        'lgAndDown',
      ],
    },
    {
      description: 'FHD (landscape)',
      width: 1920,
      height: 1080,
      name: 'xl',
      mustBeTrue: [
        'xl',
        'xlOnly',
        'smAndUp',
        'mdAndUp',
        'lgAndUp',
      ],
    },
    {
      description: 'WQHD (portrait)',
      width: 1440,
      height: 2560,
      name: 'lg',
      mustBeTrue: [
        'lg',
        'lgOnly',
        'smAndUp',
        'mdAndUp',
        'lgAndDown',
        'lgAndUp',
      ],
    },
    {
      description: 'WQHD (landscape)',
      width: 2560,
      height: 1440,
      name: 'xl',
      mustBeTrue: [
        'xl',
        'xlOnly',
        'smAndUp',
        'mdAndUp',
        'lgAndUp',
      ],
    },
  ]
  const allFlags = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xsOnly',
    'smOnly',
    'smAndDown',
    'smAndUp',
    'mdOnly',
    'mdAndDown',
    'mdAndUp',
    'lgOnly',
    'lgAndDown',
    'lgAndUp',
    'xlOnly',
  ]

  beforeEach(() => {
    breakpoint = new Breakpoint(preset)
    breakpoint.init()
  })

  scenarios.slice(0, 1).forEach(scenario => {
    it('should calculate breakpoint for ' + scenario.description, async () => {
      await resizeWindow(scenario.width, scenario.height)

      expect(breakpoint.width).toBe(scenario.width)
      expect(breakpoint.height).toBe(scenario.height)
      expect(breakpoint.name).toBe(scenario.name)
      allFlags.forEach(flag => {
        const expectedValue = scenario.mustBeTrue.indexOf(flag) !== -1
        expect(breakpoint[flag]).toBe(expectedValue)
      })
    })
  })

  it('should update breakpoint on window resize', async () => {
    await resizeWindow(715)
    expect(breakpoint.width).toBe(715)
  })

  it('should allow to change thresholds during runtime', async () => {
    await resizeWindow(401)
    expect(breakpoint.xs).toBe(true)

    await resizeWindow(698)
    expect(breakpoint.xs).toBe(false)

    await resizeWindow(1099)
    expect(breakpoint.md).toBe(true)

    await resizeWindow(1281)
    expect(breakpoint.lg).toBe(true)

    await resizeWindow(1921)
    expect(breakpoint.xl).toBe(true)
  })

  it('should allow to override defaults via factory args', async () => {
    breakpoint = new Breakpoint({
      ...preset,
      breakpoint: {
        thresholds: { xs: 400 },
      } as any,
    })
    breakpoint.init()

    await resizeWindow(401)
    expect(breakpoint.xs).toBe(false)

    await resizeWindow(399)
    expect(breakpoint.xs).toBe(true)
  })

  it('should allow breakpoint strings for mobileBreakpoint', async () => {
    breakpoint.mobileBreakpoint = 'lg'
    await resizeWindow(1920)

    expect(breakpoint.mobile).toBe(false)

    await resizeWindow(600)

    expect(breakpoint.mobile).toBe(true)
  })
})
