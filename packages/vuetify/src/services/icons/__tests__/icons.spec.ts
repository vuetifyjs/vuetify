// Service
import { Icons } from '../index'

// Preset
import { preset } from '../../../presets/default'

describe('Icons.ts', () => {
  let icon

  it('should generate default icons', () => {
    icon = new Icons(preset)

    expect(icon.values).toMatchSnapshot()
  })

  it('should use a custom iconfont preset', () => {
    preset.icons.iconfont = 'fa4'
    icon = new Icons(preset)

    expect(icon.values).toMatchSnapshot()
  })

  it('should accept custom icons', () => {
    preset.icons.iconfont = 'fa4'
    preset.icons.values.complete = 'fizzbuzz'

    icon = new Icons(preset)

    expect(icon.values.complete).toBe('fizzbuzz')
  })
})
