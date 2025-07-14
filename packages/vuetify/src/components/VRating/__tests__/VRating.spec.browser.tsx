// Components
import { VRating } from '../VRating'
import { VBtn } from '@/components/VBtn'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VRating', () => {
  it('should response to user interaction', async () => {
    const model = ref<number | null>(null)
    render(() => <VRating v-model={ model.value } />)

    const option = screen.getAllByCSS('.v-rating__item')[3]
    await userEvent.click(option)
    expect(model.value).toBe(4)
  })

  it('should respond to prop value changes', () => {
    const model = ref<number | null>(null)
    render(() => <VRating v-model={ model.value } />)

    model.value = 4

    const icons = screen.getAllByCSS('.v-rating__item .v-icon')

    icons.forEach((el, i) => {
      expect(el.outerHTML).to.equal(icons[i < 4 ? 0 : 4].outerHTML)
    })
  })

  it('should clear value if using clearable prop', async () => {
    const clearable = ref<boolean>()
    const model = ref<number | null>(null)
    render(() => (
      <VRating
        clearable={ clearable.value }
        v-model={ model.value }
      />
    ))

    const buttons = screen.getAllByCSS('.v-rating__item .v-btn')

    await userEvent.click(buttons[1])
    expect(model.value).toBe(2)

    clearable.value = true

    await userEvent.click(buttons[1])
    expect(model.value).toBe(0)
  })

  it('should not react to events when readonly', async () => {
    const model = ref<number | null>(null)
    render(() => <VRating v-model={ model.value } readonly />)

    const buttons = screen.getAllByCSS('.v-rating__item .v-btn')

    await userEvent.click(buttons[1])
    expect(model.value).toBeNull()

    model.value = 4
    await userEvent.click(buttons[0])
    expect(model.value).toBe(4)
  })

  it('should change icon on hover', async () => {
    render(() => <VRating hover />)

    const buttons = screen.getAllByCSS('.v-rating__item .v-btn')
    await userEvent.hover(buttons[2])

    const icons = screen.getAllByCSS('.v-rating__item .v-icon')

    icons.forEach((el, i) => {
      expect(el.outerHTML).to.equal(icons[i < 3 ? 0 : 3].outerHTML)
    })
  })

  it('should show item-labels', () => {
    render(() => (
      <VRating itemLabels={['1', null, null, null, '5'] as any[]} />
    ))

    expect(screen.getAllByCSS('.v-rating__wrapper > span')).toHaveLength(5)
  })

  it('should support scoped item slot', async () => {
    render(() => (
      <VRating>
        {{
          item: ({ value, rating }) => (
            <VBtn
              variant="tonal"
              class="mx-1"
              color={ rating === value ? 'primary' : undefined }
              text={ value }
            />
          ),
        }}
      </VRating>
    ))

    const buttons = screen.getAllByCSS('.v-btn.mx-1')
    await userEvent.click(buttons[1])
    expect(buttons[1]).toHaveClass('text-primary')
  })

  it('should support scoped item-label slot', () => {
    render(() => (
      <VRating>
        {{
          'item-label': props => <div class="foo">{ props.value }</div>,
        }}
      </VRating>
    ))

    expect(screen.getAllByCSS('.v-rating__wrapper > .foo')).toHaveLength(5)
  })

  it('should support half-increments', () => {
    const model = ref<number | null>(null)
    render(() => <VRating v-model={ model.value } halfIncrements />)

    expect(screen.getAllByCSS('.v-rating__item input')).toHaveLength(10)

    screen.getAllByCSS('.v-rating__item--half')[3].click()
    expect(model.value).toBe(3.5)
  })

  it('should support half-increments and custom size', () => {
    const model = ref<number | null>(null)
    render(() => <VRating v-model={ model.value } halfIncrements size="64" />)

    expect(screen.getAllByCSS('.v-rating__item input')).toHaveLength(10)

    screen.getAllByCSS('.v-rating__item--half')[3].click()
    expect(model.value).toBe(3.5)
  })

  it('should support tabbed navigation', async () => {
    const model = ref<number | null>(null)
    render(() => <VRating v-model={ model.value } />)

    const buttons = screen.getAllByCSS('.v-rating__item .v-btn')

    await userEvent.tab()
    expect(buttons[0]).toHaveFocus()
    await userEvent.keyboard('{Space}')
    expect(model.value).toBe(1)

    await userEvent.tab()
    expect(buttons[1]).toHaveFocus()

    await userEvent.tab()
    expect(buttons[2]).toHaveFocus()
    await userEvent.keyboard('{Space}')
    expect(model.value).toBe(3)

    await userEvent.tab({ shift: true })
    expect(buttons[1]).toHaveFocus()
    await userEvent.keyboard('{Space}')
    expect(model.value).toBe(2)
  })
})
