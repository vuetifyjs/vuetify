import breakpoint from '@/components/Vuetify/mixins/breakpoint'
import { test } from '@/test'

test('breakpoint.js', ({ mount }) => {
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
        'lgAndDown'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndUp'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndUp'
      ]
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
        'lgAndDown'
      ]
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
        'lgAndUp'
      ]
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
        'lgAndUp'
      ]
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
        'lgAndUp'
      ]
    }
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
    'xlOnly'
  ]

  scenarios.forEach(scenario => {
    it('should calculate breakpoint for ' + scenario.description, async () => {
      const wrapper = mount({
        mixins: [breakpoint],
        render: () => null
      })
      wrapper.setData({
        clientWidth: scenario.width,
        clientHeight: scenario.height
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.vm.breakpoint.height).toBe(scenario.height)
      expect(wrapper.vm.breakpoint.width).toBe(scenario.width)
      expect(wrapper.vm.breakpoint.name).toBe(scenario.name)
      allFlags.forEach(flag => {
        const expectedValue = scenario.mustBeTrue.indexOf(flag) !== -1
        expect(wrapper.vm.breakpoint[flag]).toBe(expectedValue)
      })
    })
  })
})
