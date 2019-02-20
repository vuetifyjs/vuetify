// Service
import { Icons } from '../index'

// Preset
import defaultPreset from '../../../presets/default'
import fa4 from '../../../icons/fa4'

describe('Icons.ts', () => {
  let icon

  it('should generate default icons', () => {
    icon = new Icons({}, defaultPreset.icons)

    expect(icon.values).toMatchSnapshot()
  })

  it('should use a custom iconfont preset', () => {
    icon = new Icons(fa4, defaultPreset.icons)

    expect(icon.values).toMatchSnapshot()
  })

  it('should accept custom icons', () => {
    icon = new Icons({
      complete: 'fizzbuzz'
    }, defaultPreset.icons)

    expect(icon.values.complete).toBe('fizzbuzz')
  })
})
