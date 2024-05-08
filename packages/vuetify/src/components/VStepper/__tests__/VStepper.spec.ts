// Components
import { VStepper } from '../VStepper'
import { VStepperItem } from '../VStepperItem'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

// Types
import type { StepperItem } from '../VStepper'

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

  it('should ignore boolean itemProps if item is string', () => {
    const itemString = 'leItem'
    const wrapper = mountFunction({
      props: {
        items: [itemString],
        itemProps: true,
      },
    })
    const itemWrapper = wrapper.getComponent(VStepperItem)

    expect(itemWrapper.vm.title).toEqual(itemString)
    expect(itemWrapper.vm.value).toBe(1)
  })

  it('should ignore complex itemProps if item is string', () => {
    const itemString = 'leItem'
    const wrapper = mountFunction({
      props: {
        items: [itemString],
        itemProps: ['anyProp'],
      },
    })
    const itemWrapper = wrapper.getComponent(VStepperItem)

    expect(itemWrapper.vm.title).toEqual(itemString)
    expect(itemWrapper.vm.value).toBe(1)
  })

  it('should use itemProps default value', () => {
    const expectedItemProps = {
      title: 'leTitle',
      value: 'leValue',
    }
    const excludedItemProps = {
      subtitle: 'leSubtitle',
    }
    const expectedNestedProps = {
      icon: 'leIcon',
    }
    const wrapper = mountFunction({
      props: {
        items: [{
          ...expectedItemProps,
          ...excludedItemProps,
          props: {
            ...expectedNestedProps,
          },
        }],
      },
    })
    const itemWrapper = wrapper.getComponent(VStepperItem)

    expect(itemWrapper.vm).toMatchObject({ ...expectedItemProps, ...expectedNestedProps })
    expect(itemWrapper.attributes()).not.toMatchObject(excludedItemProps)
  })

  it('should pass item props if itemProps is true', () => {
    const allItemProps: StepperItem = {
      color: 'leColor',
      title: 'leTitle',
      subtitle: 'leSubtitle',
      complete: true,
      editable: true,
      editIcon: 'leEditIcon',
      error: true,
      errorIcon: 'leErrorIcon',
      icon: 'leIcon',
      ripple: false,
      rules: [Boolean],
      value: 'leValue',
      disabled: true,
      selectedClass: 'leSelectedClass',
    }

    const nonItemProps = {
      leOtherProp: 'leOtherValue',
    }

    const wrapper = mountFunction({
      props: {
        itemProps: true,
        items: [{
          ...allItemProps,
          ...nonItemProps,
        }],
      },
    })
    const itemWrapper = wrapper.getComponent(VStepperItem)

    expect(itemWrapper.vm).toMatchObject(allItemProps)
    expect(itemWrapper.attributes()).not.toMatchObject(nonItemProps)
  })

  it('should override itemTitle and itemValue props with itemProps', () => {
    const expectedItemProps = {
      title: 'theActualTitle',
      value: 'theActualValue',
    }
    const misleadingProps = {
      notTheTitle: 'not the title',
      notTheValue: 'not the value',
    }
    const wrapper = mountFunction({
      props: {
        itemTitle: 'notTheTitle',
        itemValue: 'notTheValue',
        itemProps: () => expectedItemProps,
        items: [{
          ...misleadingProps,
        }],
      },
    })
    const itemWrapper = wrapper.getComponent(VStepperItem)

    expect(itemWrapper.vm).toMatchObject(expectedItemProps)
    expect(itemWrapper.attributes()).not.toMatchObject(misleadingProps)
  })
})
