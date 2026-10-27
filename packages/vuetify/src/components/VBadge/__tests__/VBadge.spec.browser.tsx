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
    <VBadge inline icon="$vuetify" iconSize={ size } height="auto" />
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
    ])('should apply icon-size %s and fit icons with automatic height', (size, pixels) => {
      render(() => <VBadge inline icon="$vuetify" iconSize={ size } height="auto" />)

      const icon = screen.getByCSS('.v-badge__badge .v-icon')
      expect(getComputedStyle(icon).fontSize).toBe(`${pixels}px`)

      const iconBounds = icon.getBoundingClientRect()
      const badgeBounds = screen.getByCSS('.v-badge__badge').getBoundingClientRect()
      expect(iconBounds.top).toBeGreaterThanOrEqual(badgeBounds.top)
      expect(iconBounds.bottom).toBeLessThanOrEqual(badgeBounds.bottom)
      expect(iconBounds.left).toBeGreaterThanOrEqual(badgeBounds.left)
      expect(iconBounds.right).toBeLessThanOrEqual(badgeBounds.right)
    })

    it('should apply icon-size to icons in the badge slot', () => {
      render(() => (
        <VBadge inline iconSize="large" v-slots={{ badge: () => <VIcon icon="$vuetify" /> }} />
      ))

      expect(getComputedStyle(screen.getByCSS('.v-icon')).fontSize).toBe('21px')
    })

    it('should allow a slotted icon to override icon-size', () => {
      render(() => (
        <VBadge inline iconSize={ 32 } v-slots={{ badge: () => <VIcon icon="$vuetify" size="small" /> }} />
      ))

      expect(getComputedStyle(screen.getByCSS('.v-icon')).fontSize).toBe('15px')
    })

    it('should react to icon-size changes', async () => {
      const size = shallowRef<string | number>()
      render(() => <VBadge inline icon="$vuetify" iconSize={ size.value } />)

      const icon = screen.getByCSS('.v-icon')
      expect(getComputedStyle(icon).fontSize).toBe('12px')

      for (const [value, pixels] of [['large', 21], [32, 32], [undefined, 12]] as const) {
        size.value = value
        await expect.poll(() => getComputedStyle(icon).fontSize).toBe(`${pixels}px`)
      }
    })

    it('should restore icon-size when the slotted icon size is cleared', async () => {
      const size = shallowRef<string | number>()
      render(() => (
        <VBadge inline iconSize="large" v-slots={{ badge: () => <VIcon icon="$vuetify" size={ size.value } /> }} />
      ))

      const icon = screen.getByCSS('.v-icon')
      expect(getComputedStyle(icon).fontSize).toBe('21px')

      for (const [value, pixels] of [['small', 15], [32, 32], [undefined, 21]] as const) {
        size.value = value
        await expect.poll(() => getComputedStyle(icon).fontSize).toBe(`${pixels}px`)
      }
    })

    it('should keep fixed height unless automatic height is requested', async () => {
      const height = shallowRef<string | number>()
      render(() => <VBadge inline icon="$vuetify" iconSize={ 32 } height={ height.value } />)

      const badge = screen.getByCSS('.v-badge__badge')
      expect(getComputedStyle(badge).height).toBe('20px')

      height.value = 'auto'
      await expect.poll(() => badge.getBoundingClientRect().height).toBeGreaterThanOrEqual(32)

      height.value = 24
      await expect.poll(() => getComputedStyle(badge).height).toBe('24px')
    })

    it('should support icon-size through badge defaults', () => {
      render(<VBadge inline icon="$vuetify" />, null, { defaults: { VBadge: { iconSize: 24 } } })

      expect(getComputedStyle(screen.getByCSS('.v-icon')).fontSize).toBe('24px')
    })

    it('should prefer icon-size over inherited icon defaults', () => {
      render(() => (
        <VBadge inline iconSize="large" v-slots={{ badge: () => <VIcon icon="$vuetify" /> }} />
      ), null, { defaults: { VIcon: { size: 24 } } })

      expect(getComputedStyle(screen.getByCSS('.v-icon')).fontSize).toBe('21px')
    })
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
