// Service
import { Icons } from '../index'

// Preset
import { Preset } from '../../../presets/default'

describe('Icons.ts', () => {
  let icon

  it('should generate default icons', () => {
    icon = new Icons(Preset)

    expect(icon.values).toMatchSnapshot()
  })

  it('should use a custom iconfont preset', () => {
    icon = new Icons({
      ...Preset,
      icons: { iconfont: 'fa4' },
    })

    expect(icon.values).toMatchSnapshot()
  })

  it('should accept custom icons', () => {
    icon = new Icons({
      ...Preset,
      icons: {
        values: { complete: 'fizzbuzz' },
      },
    })

    expect(icon.values.complete).toBe('fizzbuzz')
  })
})
