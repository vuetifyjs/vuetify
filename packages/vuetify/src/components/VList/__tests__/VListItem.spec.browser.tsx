// Components
import { VListItem } from '../'

// Utilities
import { render } from '@test'
import { ref } from 'vue'

describe('VListItem', () => {
  it('supports header text props, title and subtitle', () => {
    const { container } = render(() => (
      <div style="width: 200px;">
        <h2 class="mt-8">ListItem Header Text</h2>
        <VListItem title="foo" subtitle="bar" />
      </div>
    ))

    const title = container.querySelector('.v-list-item-title')
    const subtitle = container.querySelector('.v-list-item-subtitle')

    expect(title).toHaveTextContent('foo')
    expect(subtitle).toHaveTextContent('bar')
  })

  // https://github.com/vuetifyjs/vuetify/issues/13893
  it('should use active-color for active item', async () => {
    const isActive = ref(false)
    const { container, rerender } = render(() => (
      <div style="width: 200px;">
        <VListItem title="foo" subtitle="bar" color="success" active={ isActive.value } />
      </div>
    ))

    const listItem = container.querySelector('.v-list-item')
    expect(listItem).not.toHaveClass('text-success')

    // Set active to true
    isActive.value = true
    await rerender(() => (
      <div style="width: 200px;">
        <VListItem title="foo" subtitle="bar" color="success" active={ isActive.value } />
      </div>
    ))

    expect(listItem).toHaveClass('text-success')
  })

  it('should render prepend and append slots', async () => {
    const props = ref({
      prependIcon: '$success',
      appendIcon: undefined,
    })

    const { container, rerender } = render(() => (
      <div style="width: 200px;">
        <VListItem
          title="foo"
          subtitle="bar"
          prependIcon={ props.value.prependIcon }
          appendIcon={ props.value.appendIcon }
        />
      </div>
    ))

    // Initially has prepend but no append
    expect(container.querySelector('.v-list-item__prepend')).toBeTruthy()
    expect(container.querySelector('.v-list-item__append')).toBeFalsy()

    // Change props
    props.value = {
      prependIcon: undefined,
      appendIcon: '$success',
    }

    await rerender(() => (
      <div style="width: 200px;">
        <VListItem
          title="foo"
          subtitle="bar"
          prependIcon={ props.value.prependIcon }
          appendIcon={ props.value.appendIcon }
        />
      </div>
    ))

    // Now has append but no prepend
    expect(container.querySelector('.v-list-item__append')).toBeTruthy()
    expect(container.querySelector('.v-list-item__prepend')).toBeFalsy()
  })
})
