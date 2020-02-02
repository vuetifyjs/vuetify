// Effects
import {
  sizeProps,
  SizeProps,
  useSizeClasses,
} from '../size'

describe('size.ts', () => {
  it('should have the correct class', () => {
    const props: SizeProps[] = [
      {},
      { large: true },
      { small: true },
      { xLarge: true },
      { xSmall: true },
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
