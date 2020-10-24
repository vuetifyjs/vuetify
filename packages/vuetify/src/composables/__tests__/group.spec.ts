import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { useGroup, useGroupItem } from '../'

describe('group', () => {
  describe('with complex values', () => {
    const GroupItemComponent = defineComponent({
      props: {
        value: Object,
      },
      setup (props) {
        const item = useGroupItem(props, Symbol.for('test'))
        return () => h('div', {
          class: {
            selected: item.isSelected.value,
          },
          onClick: item.toggle,
        }, [JSON.stringify(props.value)])
      },
    })

    const GroupComponent = defineComponent({
      props: {
        modelValue: Object,
      },
      setup (props, context) {
        useGroup(props, context, Symbol.for('test'))
        return () => h('div', [
          h(GroupItemComponent, { value: { foo: 1 } }),
          h(GroupItemComponent, { value: { bar: 2 } }),
        ])
      },
    })

    it('should accept new value', async () => {
      const wrapper = mount(GroupComponent)

      expect(wrapper.html()).toMatchSnapshot()

      await wrapper.setProps({ modelValue: { foo: 1 } })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should emit selected value', async () => {
      const wrapper = mount(GroupComponent)

      const item = wrapper.findAllComponents(GroupItemComponent)

      await item[1].trigger('click')

      expect(wrapper.emitted('update:modelValue')).toEqual([
        [{ bar: 2 }],
      ])

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('with explicit values', () => {
    const GroupItemComponent = defineComponent({
      props: {
        value: [String, Number],
      },
      setup (props) {
        const item = useGroupItem(props, Symbol.for('test'))
        return () => h('div', {
          class: {
            selected: item.isSelected.value,
          },
          onClick: item.toggle,
        }, [props.value])
      },
    })

    const GroupComponent = defineComponent({
      props: {
        modelValue: [Array, String],
        multiple: Boolean,
        mandatory: Boolean,
        max: Number,
      },
      setup (props, context) {
        useGroup(props, context, Symbol.for('test'))
        return () => h('div', [
          h(GroupItemComponent, { value: 'one' }),
          h(GroupItemComponent, { value: 'two' }),
        ])
      },
    })

    it('should emit new selection', async () => {
      const wrapper = mount(GroupComponent)

      const item = wrapper.findComponent(GroupItemComponent)

      await item.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toEqual([
        ['one'],
      ])

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should default to single selection', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          modelValue: 'two',
          multiple: false,
          mandatory: false,
        },
      })

      const items = wrapper.findAllComponents(GroupItemComponent)

      await items[1].trigger('click')
      await items[0].trigger('click')

      expect(wrapper.emitted('update:modelValue')).toEqual([
        [undefined],
        ['one'],
      ])
    })

    it('should allow multiple selection', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          multiple: true,
          mandatory: false,
        },
      })

      const items = wrapper.findAllComponents(GroupItemComponent)

      await items[1].trigger('click')
      await items[0].trigger('click')

      expect(wrapper.emitted()['update:modelValue']).toEqual([
        [['two']],
        [['one', 'two']],
      ])
    })

    it('should set first item as value when mandatory', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          mandatory: true,
          multiple: false,
        },
      })

      expect(wrapper.emitted()['update:modelValue']).toEqual([
        ['one'],
      ])
    })

    it('should not allow empty value when mandatory', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          modelValue: 'one',
          mandatory: true,
          multiple: false,
        },
      })

      wrapper.findAllComponents(GroupItemComponent)

      const items = wrapper.findAllComponents(GroupItemComponent)

      await items[0].trigger('click')

      expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    })

    it('should not allow selection bigger than max', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          mandatory: false,
          multiple: true,
          max: 1,
        },
      })

      wrapper.findAllComponents(GroupItemComponent)

      const items = wrapper.findAllComponents(GroupItemComponent)

      await items[0].trigger('click')
      await items[1].trigger('click')

      expect(wrapper.emitted()['update:modelValue']).toEqual([
        [['one']],
      ])
    })
  })

  describe('with implicit values', () => {
    const GroupItemComponent = defineComponent({
      setup (props) {
        const item = useGroupItem(props, Symbol.for('test'))
        return () => h('div', {
          class: {
            selected: item.isSelected.value,
          },
          onClick: item.toggle,
        }, [])
      },
    })

    const GroupComponent = defineComponent({
      props: {
        multiple: Boolean,
        mandatory: Boolean,
        max: Number,
      },
      setup (props, context) {
        useGroup(props, context, Symbol.for('test'))
        return () => h('div', [
          h(GroupItemComponent),
          h(GroupItemComponent),
        ])
      },
    })

    it('should emit new selection', async () => {
      const wrapper = mount(GroupComponent)

      const item = wrapper.findComponent(GroupItemComponent)

      await item.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should default to single selection', async () => {
      const wrapper = mount(GroupComponent)

      const items = wrapper.findAllComponents(GroupItemComponent)

      await items[1].trigger('click')
      await items[0].trigger('click')

      const events = wrapper.emitted<string>('update:modelValue')

      expect(events).toHaveLength(2)
      expect(Array.isArray(events[0][0])).toBe(false)
      expect(Array.isArray(events[1][0])).toBe(false)
    })

    it('should allow multiple selection', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          multiple: true,
          mandatory: false,
        },
      })

      const items = wrapper.findAllComponents(GroupItemComponent)

      await items[1].trigger('click')
      await items[0].trigger('click')

      const events = wrapper.emitted<string[]>('update:modelValue')

      expect(events).toHaveLength(2)
      expect(Array.isArray(events[0][0])).toBe(true)
      expect(events[0][0]).toHaveLength(1)
      expect(Array.isArray(events[1][0])).toBe(true)
      expect(events[1][0]).toHaveLength(2)
      expect(events[1][0][0]).not.toEqual(events[1][0][1])
    })

    it('should set first item as value when mandatory', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          mandatory: true,
          multiple: false,
        },
      })

      expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    })

    it('should not allow empty value when mandatory', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          mandatory: true,
          multiple: false,
        },
      })

      wrapper.findAllComponents(GroupItemComponent)

      const items = wrapper.findAllComponents(GroupItemComponent)

      await items[0].trigger('click')

      expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    })

    it('should not allow selection bigger than max', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          multiple: true,
          mandatory: false,
          max: 1,
        },
      })

      wrapper.findAllComponents(GroupItemComponent)

      const items = wrapper.findAllComponents(GroupItemComponent)

      await items[0].trigger('click')
      await items[1].trigger('click')

      const events = wrapper.emitted<string[]>('update:modelValue')

      expect(events).toHaveLength(1)
      expect(events[0][0]).toHaveLength(1)
    })
  })
})
