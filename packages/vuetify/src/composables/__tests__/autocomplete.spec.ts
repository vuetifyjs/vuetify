// Composables
import { makeAutocompleteProps, useAutocomplete } from '../autocomplete'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'

// Types
import type { InputAutocompleteProps } from '../autocomplete'

describe('input-autocomplete', () => {
  function mountFunction (props: Partial<InputAutocompleteProps> = {}) {
    return mount(defineComponent({
      props: {
        name: String,
        ...makeAutocompleteProps(),
      },
      setup (props) {
        const { fieldAutocomplete, fieldName, isSuppressing, update } = useAutocomplete(props)

        return () => h('input', {
          autocomplete: fieldAutocomplete.value,
          name: fieldName.value,
          onFocus: () => isSuppressing.value && update(),
        })
      },
    }), { props })
  }

  it.each([
    [{ autocomplete: undefined, name: undefined }],
    [{ autocomplete: 'on', name: undefined }],
    [{ autocomplete: undefined, name: 'username' }],
    [{ autocomplete: 'current-password', name: 'password' }],
    [{ autocomplete: 'shipping street-address', name: 'shipping-address' }],
    [{ autocomplete: 'off', name: 'email' }],
  ])('should pass through regular props', async (props: InputAutocompleteProps) => {
    const wrapper = mountFunction(props)

    expect(wrapper.vm.$el.autocomplete).toEqual(props.autocomplete ?? '')
    expect(wrapper.vm.$el.name).toEqual(props.name ?? '')

    wrapper.trigger('focus')
    await nextTick()
    expect(wrapper.vm.$el.name).toEqual(props.name ?? '')
  })

  it('[suppress] should update field name on focus', async () => {
    const wrapper = mountFunction({ autocomplete: 'suppress', name: 'username' })

    expect(wrapper.vm.$el.autocomplete).toBe('off')
    expect(wrapper.vm.$el.name).toBe('username-v-0-0')

    wrapper.trigger('focus')
    await nextTick()
    expect(wrapper.vm.$el.name).toMatch(/username-v-0-\d{13}/)
  })
})
