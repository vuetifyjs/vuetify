// Components
import { VBadge } from '..'
import { VBtn } from '@/components/VBtn'
import { VIcon } from '@/components/VIcon'

// Utilities
import { gridOn, render, screen, showcase } from '@test'
import { shallowRef } from 'vue'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']
const location = ['bottom start', 'bottom end', 'top start', 'top end']
const rounded = ['circle', 'pill', 'shaped', 'tr-xl', 'br-lg', 0] // TODO: fix pill
const offset = [8, -8, '4', '-4', undefined]

const props = {
  bordered: true,
  color: defaultColors,
  content: ['content'],
  dot: true,
  icon: ['$vuetify'],
  floating: true,
  inline: true,
  location,
  modelValue: true,
  rounded,
}

const stories = {
  'Default badge': <VBadge />,
  'Icon badge': <VBadge icon="$vuetify" />,
  'Icon sizes': gridOn([null], [undefined, 'x-small', 'small', 'default', 'large', 'x-large', 32], (_, size) => (
    <VBadge inline v-slots={{ badge: () => <VIcon icon="$vuetify" size={ size } /> }} />
  )),
  'Offset badge': gridOn(['offsetX', 'offsetY'], offset, (xy, offset) => (
    <VBadge { ...{ [xy]: offset } } content="0">
      <VBtn variant="tonal">
        { String(offset) }
      </VBtn>
    </VBadge>
  )),
  Color: gridOn([null], defaultColors, (_, color) => (
    <VBadge color={ color } content="0">
      <VBtn variant="tonal">
        { color }
      </VBtn>
    </VBadge>
  )),
  'Text color': gridOn([null], defaultColors, (_, color) => (
    <VBadge color="surface-light" textColor={ color } content="0">
      <VBtn variant="tonal">
        { color }
      </VBtn>
    </VBadge>
  )),
}

// Tests
describe('VBadge', () => {
  describe('icon size', () => {
    it('should keep default badge icons small without affecting the default slot', () => {
      const { container } = render(() => (
        <>
          <VBadge inline icon="$vuetify" />
          <VBadge inline v-slots={{ badge: () => <VIcon icon="$vuetify" /> }}>
            <VIcon data-testid="activator-icon" icon="$vuetify" />
          </VBadge>
        </>
      ))

      for (const icon of container.querySelectorAll('.v-badge__badge .v-icon')) {
        expect(getComputedStyle(icon).fontSize).toBe('12px')
        expect(getComputedStyle(icon.closest('.v-badge__badge')!).height).toBe('20px')
      }
      expect(getComputedStyle(screen.getByTestId('activator-icon')).fontSize).toBe('24px')
    })

    it.each([
      ['x-small', 12],
      ['small', 15],
      ['default', 18],
      ['large', 21],
      ['x-large', 24],
      [32, 32],
    ])('should fit an icon with size %s inside the badge', (size, pixels) => {
      render(() => (
        <VBadge inline v-slots={{ badge: () => <VIcon icon="$vuetify" size={ size } /> }} />
      ))

      const icon = screen.getByCSS('.v-badge__badge .v-icon')
      expect(getComputedStyle(icon).fontSize).toBe(`${pixels}px`)

      const iconBounds = icon.getBoundingClientRect()
      const badgeBounds = screen.getByCSS('.v-badge__badge').getBoundingClientRect()
      expect(iconBounds.top).toBeGreaterThanOrEqual(badgeBounds.top)
      expect(iconBounds.bottom).toBeLessThanOrEqual(badgeBounds.bottom)
      expect(iconBounds.left).toBeGreaterThanOrEqual(badgeBounds.left)
      expect(iconBounds.right).toBeLessThanOrEqual(badgeBounds.right)
    })

    it('should update the icon size and restore the badge default when cleared', async () => {
      const size = shallowRef<string | number>()
      render(() => (
        <VBadge inline v-slots={{ badge: () => <VIcon icon="$vuetify" size={ size.value } /> }} />
      ))

      const icon = screen.getByCSS('.v-badge__badge .v-icon')
      expect(getComputedStyle(icon).fontSize).toBe('12px')

      for (const [value, pixels] of [['large', 21], [32, 32], [undefined, 12]] as const) {
        size.value = value
        await expect.poll(() => getComputedStyle(icon).fontSize).toBe(`${pixels}px`)
      }
    })

    it.each([
      { VIcon: { size: 24 } },
      { VBadge: { VIcon: { size: 24 } } },
      { global: { size: 24 } },
    ])('should preserve inherited icon size defaults (%j)', defaults => {
      render(() => (
        <VBadge inline v-slots={{ badge: () => <VIcon icon="$vuetify" /> }} />
      ), null, { defaults })

      expect(getComputedStyle(screen.getByCSS('.v-badge__badge .v-icon')).fontSize).toBe('24px')
    })

    it.each([
      [{ height: 24, width: 24 }, 24, 24],
      [{ height: 40, width: 40 }, 40, 40],
      [{ maxHeight: 16, maxWidth: 24 }, 16, 24],
    ] as const)('should preserve explicit badge dimensions (%j)', (dimensions, height, width) => {
      render(() => (
        <VBadge inline { ...dimensions } v-slots={{ badge: () => <VIcon icon="$vuetify" size={ 32 } /> }} />
      ))

      const badge = screen.getByCSS('.v-badge__badge')
      expect(getComputedStyle(badge).height).toBe(`${height}px`)
      expect(getComputedStyle(badge).width).toBe(`${width}px`)
      expect(getComputedStyle(screen.getByCSS('.v-icon')).fontSize).toBe('32px')
    })

    it.each([
      [{ height: 12 }, 12],
      [{ maxHeight: 16 }, 16],
    ] as const)('should preserve nested badge dimensions (%j)', (dimensions, height) => {
      render(() => (
        <VBadge content="outer">
          <VBadge { ...dimensions } icon="$vuetify" label="nested" />
        </VBadge>
      ))

      expect(getComputedStyle(screen.getByLabelText('nested')).height).toBe(`${height}px`)
    })

    it('should fit icons in positioned badges', () => {
      render(() => (
        <VBadge v-slots={{ badge: () => <VIcon icon="$vuetify" size={ 32 } /> }}>
          <VBtn>Notifications</VBtn>
        </VBadge>
      ))

      const iconBounds = screen.getByCSS('.v-badge__badge .v-icon').getBoundingClientRect()
      const badgeBounds = screen.getByCSS('.v-badge__badge').getBoundingClientRect()
      expect(iconBounds.top).toBeGreaterThanOrEqual(badgeBounds.top)
      expect(iconBounds.bottom).toBeLessThanOrEqual(badgeBounds.bottom)
      expect(iconBounds.left).toBeGreaterThanOrEqual(badgeBounds.left)
      expect(iconBounds.right).toBeLessThanOrEqual(badgeBounds.right)
    })

    it('should resume automatic height when a fixed height is cleared', async () => {
      const height = shallowRef<number>()
      render(() => (
        <VBadge inline height={ height.value } v-slots={{ badge: () => <VIcon icon="$vuetify" size={ 32 } /> }} />
      ))

      const badge = screen.getByCSS('.v-badge__badge')
      expect(badge.getBoundingClientRect().height).toBeGreaterThanOrEqual(32)

      height.value = 24
      await expect.poll(() => getComputedStyle(badge).height).toBe('24px')

      height.value = undefined
      await expect.poll(() => badge.getBoundingClientRect().height).toBeGreaterThanOrEqual(32)
    })
  })

  it.each([
    [{ content: '99+' }, 20],
    [{}, 20],
    [{ dot: true }, 9],
    [{ dot: true, dotSize: 12 }, 12],
  ] as const)('should preserve non-icon badge height (%j)', (props, height) => {
    render(<VBadge inline { ...props } />)

    expect(getComputedStyle(screen.getByCSS('.v-badge__badge')).height).toBe(`${height}px`)
  })

  describe('label', () => {
    it('should have the designated aria label', async () => {
      render(<VBadge label="label-badge">label</VBadge>)
      await expect(screen.findByLabelText('label-badge')).resolves.toBeDefined()
    })
  })

  describe('max', () => {
    it('should add a suffix if the content value is greater than the max value', () => {
      const { container } = render(<VBadge content="1000" max="999" />)
      expect(container).toHaveTextContent('+')
    })
  })

  describe('tag', () => {
    it('renders the proper tag instead of a div', () => {
      const { wrapper } = render(<VBadge tag="custom-tag">tag</VBadge>)
      const el = wrapper.find('custom-tag').element
      expect(el).toHaveTextContent('tag')
    })
  })

  showcase({ stories, props, component: VBadge })
})
