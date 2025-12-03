// Components
import { VRating } from '../VRating'
import { VBtn } from '@/components/VBtn'

// Utilities
import { click, generate, render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

const stories = {
  'Item labels': <VRating itemLabels={['1', '', '', '', '5']} />,
  'Item slot': (
    <VRating modelValue={ 1 }>
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
  ),
  'Item label slot': (
    <VRating>
      {{
        'item-label': props => <>C{ props.value }</>,
      }}
    </VRating>
  ),
}

describe('VRating', () => {
  it('should response to user interaction', async () => {
    const model = ref<number>()
    render(() => <VRating v-model={ model.value } />)

    const option = screen.getAllByCSS('.v-rating__item')[3]
    await userEvent.click(option)
    expect(model.value).toBe(4)
  })

  it('should respond to prop value changes', () => {
    const model = ref<number>()
    render(() => <VRating v-model={ model.value } />)

    model.value = 4

    const icons = screen.getAllByCSS('.v-rating__item .v-icon')

    icons.forEach((el, i) => {
      expect(el.outerHTML).to.equal(icons[i < 4 ? 0 : 4].outerHTML)
    })
  })

  it('should clear value if using clearable prop', async () => {
    const clearable = ref<boolean>()
    const model = ref<number>()
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

  it('should not react to click events when readonly', async () => {
    const model = ref<number>()
    render(() => <VRating v-model={ model.value } readonly />)

    const buttons = screen.getAllByCSS('.v-rating__item .v-btn')

    await click(buttons[1])
    await nextTick()
    expect(model.value).toBeUndefined()

    model.value = 4
    await click(buttons[0])
    await nextTick()
    expect(model.value).toBe(4)
  })

  it('should not react to keyboard events when readonly', async () => {
    const model = ref<number>()
    render(() => <VRating v-model={ model.value } readonly />)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    await nextTick()
    expect(model.value).toBeUndefined()

    model.value = 4
    await userEvent.keyboard('{ArrowLeft}')
    await nextTick()
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

  it('should support correct keyboard navigation', async () => {
    const model = ref<number | null>(null)
    render(() => (
      <div>
        <VRating v-model={ model.value } />
        <input type="text" />
      </div>
    ))

    const buttons = screen.getAllByCSS('.v-rating__item .v-btn')
    const inputBelow = screen.getByCSS('input[type="text"]')

    await userEvent.tab()
    expect(buttons[0]).toHaveFocus()
    await userEvent.keyboard('{Space}')
    expect(model.value).toBe(1)

    await userEvent.tab() // should escape the VRating
    expect(inputBelow).toHaveFocus()

    await userEvent.tab({ shift: true }) // should return
    expect(buttons[0]).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    expect(buttons[2]).toHaveFocus()

    await userEvent.keyboard('{ArrowLeft}')
    expect(model.value).toBe(2)
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
