// Components

import { VStepper } from '../VStepper'
import { VStepperItem } from '../VStepperItem'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VStepper.ts', () => {
  const vuetify = createVuetify()
  const mountFunction = (options: Record<string, any> = {}) => {
    const { global, ...opts } = options
    return mount(VStepper, {
      ...opts,
      global: {
        plugins: [vuetify],
        ...global,
      },
    })
  }

  it('should use string if item is string', () => {
    const itemString = 'leItem'
    const wrapper = mountFunction({
      props: {
        items: [itemString],
      },
    })
    const itemWrapper = wrapper.getComponent(VStepperItem)

    expect(itemWrapper.vm.title).toEqual(itemString)
    expect(itemWrapper.vm.value).toBe(1)
  })

  it('should pass item values to item component', () => {
    const itemProps = {
      color: 'leColor',
      title: 'overridden by itemTitle prop',
      subtitle: 'leSubtitle',
      complete: true,
      editable: true,
      editIcon: 'leEditIcon',
      error: true,
      errorIcon: 'leErrorIcon',
      icon: 'leIcon',
      ripple: false,
      rules: [Boolean],
      value: 'overridden by itemValue prop',
      disabled: true,
      selectedClass: 'leSelectedClass',
    }
    const itemTitle = 'myTitle'
    const itemValue = 'myValue'
    const renamedProps = {
      [itemTitle]: 'leTitle',
      [itemValue]: 'leValue',
    }
    const wrapper = mountFunction({
      props: {
        itemTitle,
        itemValue,
        items: [{
          ...itemProps,
          ...renamedProps,
        }],
      },
    })
    const itemWrapper = wrapper.getComponent(VStepperItem)
    const expectedProps = { ...itemProps, title: renamedProps[itemTitle], value: renamedProps[itemValue] }
    const excludedAttributes = Object.fromEntries(Object.keys(renamedProps).map(key => [key.toLowerCase(), expect.anything()]))

    expect(itemWrapper.vm).toMatchObject(expectedProps)
    expect(itemWrapper.attributes()).not.toMatchObject(excludedAttributes)
  })
})
