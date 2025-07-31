// Components
import { VBadge } from '..'
import { VBtn } from '@/components/VBtn'

// Utilities
import { generate, gridOn, render, screen } from '@test'

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

  describe('Showcase', () => {
    generate({ stories, props, component: VBadge })
  })
})
