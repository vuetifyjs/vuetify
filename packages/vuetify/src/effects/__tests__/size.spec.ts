// Effects
import {
  sizeProps,
  SizeProps,
  useSizeClasses,
} from '../size'

describe('size.ts', () => {
  it('should have the correct class', () => {
    const props: SizeProps[] = [
      undefined,
      null,
      0 as any,
      '' as any,
      { size: undefined },
      { size: 'x-small' },
      { size: 'small' },
      { size: 'default' },
      { size: 'large' },
      { size: 'x-large' },
    ]

    for (const prop of props) {
      const sizedProps = sizeProps(prop)
      const { sizeClasses } = useSizeClasses(prop)

      expect(sizeClasses.value).toMatchSnapshot()
      expect(sizedProps).toMatchSnapshot()
    }

    expect(sizeProps()).toMatchSnapshot()
  })
})
