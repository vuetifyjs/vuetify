import { useNested, useNestedGroup, useNestedItem } from '@/composables/nested/nested'
import { defineComponent } from '@/util'
import { toRef } from 'vue'

export const VNestedSimpleItem = defineComponent({
  name: 'VNestedSimpleItem',

  props: {
    header: Boolean,
    selected: Boolean,
    indeterminate: Boolean,
    open: Boolean,
  },

  setup (props, { slots, emit }) {
    const handleOpen = (e: Event) => emit('click:open', e)
    const handleSelect = (e: Event) => emit('click:select', e)

    return () => (
      <div class={[
        'v-nested-item',
        {
          'v-nested-item--header': props.header,
        },
      ]}
      >
        {props.header && (
          <input
            type="checkbox"
            checked={props.open}
            onChange={handleOpen}
          />
        )}
        { slots.default?.() }
        <input
          type="checkbox"
          checked={props.selected}
          indeterminate={props.indeterminate}
          onChange={handleSelect}
        />
      </div>
    )
  },
})

export const VNestedItem = defineComponent({
  name: 'VNestedItem',
  props: {
    text: String,
    value: String,
  },
  setup (props, { slots }) {
    const { select, isSelected, id } = useNestedItem(toRef(props, 'value'))

    return () => (
      <VNestedSimpleItem
        selected={isSelected.value}
        onClick:select={e => select(id.value, e.target.checked, e)}
      >
        { slots.default ? slots.default() : props.text }
      </VNestedSimpleItem>
    )
  },
})

export const VNestedGroup = defineComponent({
  name: 'VNestedGroup',
  props: {
    text: String,
    value: String,
    items: Array,
  },
  setup (props, { slots }) {
    const { isOpen, isSelected, isIndeterminate, root: { open, select }, id } = useNestedGroup(props)
    return () => (
      <div class="v-nested-group">
        <div class="header">
          <VNestedSimpleItem
            header
            selected={isSelected.value}
            indeterminate={isIndeterminate.value}
            onClick:select={e => select(id.value, e.target.checked, e)}
            open={isOpen.value}
            onClick:open={e => open(id.value, e.target.checked, e)}
          >
            { slots.header ? slots.header() : props.text }
          </VNestedSimpleItem>
        </div>
        <div class="items" v-show={isOpen.value}>
          {
            props.items ? props.items.map(item => item.children ? (
              <VNestedGroup items={item.children} text={item.text} value={item.value} />
            ) : (
              <VNestedItem text={item.text} value={item.value} />
            )) : slots.default?.()
          }
        </div>
      </div>
    )
  },
})

export const VNested = defineComponent({
  name: 'VNested',
  props: {
    items: Array,
    selected: [Array, Object],
    selectStrategy: [String, Function],
    openStrategy: [String, Function],
    opened: [Array],
  },
  setup (props, { slots }) {
    const nested = useNested(props)
    return () => (
      <div class="v-nested">
        {
          props.items ? props.items.map(item => item.children ? (
            <VNestedGroup items={item.children} text={item.text} value={item.value} />
          ) : (
            <VNestedItem text={item.text} value={item.value} />
          )) : slots.default?.()
        }
        <div>
          <div>OPEN</div>
          <div>{[...nested.root.opened.value.values()].join(', ')}</div>
        </div>
        <div>
          <div>SELECTED</div>
          <div>{nested.root.selectedValues.value.join(', ')}</div>
        </div>
      </div>
    )
  },
})
