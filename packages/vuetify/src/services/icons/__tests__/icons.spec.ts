// Service
import { Icons } from '../index'

describe('Icons.ts', () => {
  let icon

  it('should generate default icons', () => {
    icon = new Icons()

    expect(icon.values).toMatchSnapshot()
  })

  it('should use a custom iconfont preset', () => {
    icon = new Icons({
      iconfont: 'fa4',
    })

    expect(icon.values).toMatchSnapshot()
  })

  it('should accept custom icons', () => {
    icon = new Icons({
      values: {
        complete: 'fizzbuzz',
      },
    })

    expect(icon.values.complete).toBe('fizzbuzz')
  })
})
