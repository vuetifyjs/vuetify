import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, reactive } from 'vue'
import { useGroup, useGroupItem } from '../group'

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
      setup (props) {
        useGroup(props, Symbol.for('test'))
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
        index: Number,
        disabled: Boolean,
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
        disabled: Array,
      },
      setup (props) {
        return useGroup(props, Symbol.for('test'))
      },
      render () {
        return h('div', this.$slots.default?.() ?? [
          h(GroupItemComponent, { value: 'one', disabled: !!this.disabled?.[0] }),
          h(GroupItemComponent, { value: 'two', disabled: !!this.disabled?.[1] }),
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

    it('should not emit new selection if clicking disabled item', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          disabled: [true, false],
        },
      })

      const item = wrapper.findComponent(GroupItemComponent)

      await item.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeUndefined()

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should accept initial value', async () => {
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

    it('should set first non-disabled item as value when mandatory', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          mandatory: true,
          multiple: false,
          disabled: [true, false],
        },
      })

      expect(wrapper.emitted()['update:modelValue']).toEqual([
        ['two'],
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

    it('should select newly inserted value', async () => {
      const values = reactive(['one', 'two'])
      const wrapper = mount(GroupComponent, {
        props: {
          modelValue: 'one',
          multiple: false,
          mandatory: false,
        },
        slots: {
          default () {
            return values.map((value, index) => h(GroupItemComponent, { value, index, key: value }))
          },
        },
      })

      values.splice(1, 0, 'three')
      await nextTick()
      wrapper.vm.next()
      await nextTick()

      expect(wrapper.emitted()['update:modelValue']).toEqual([
        ['three'],
      ])
    })
  })

  describe('with implicit values', () => {
    const GroupItemComponent = defineComponent({
      props: {
        disabled: Boolean,
      },
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
        disabled: Array,
      },
      setup (props) {
        useGroup(props, Symbol.for('test'))
        return () => h('div', [
          h(GroupItemComponent, { disabled: !!props.disabled?.[0] }),
          h(GroupItemComponent, { disabled: !!props.disabled?.[1] }),
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

    it('should set first non-disabled item as value when mandatory', async () => {
      const wrapper = mount(GroupComponent, {
        props: {
          mandatory: true,
          multiple: false,
          disabled: [true, false],
        },
      })

      // selection happens in mounted so we need to await
      // to be able to match snapshot
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
      expect(wrapper.html()).toMatchSnapshot()
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
