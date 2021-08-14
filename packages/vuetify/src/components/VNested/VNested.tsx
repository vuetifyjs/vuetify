import { useProxiedModel } from '@/composables/proxiedModel'
import { defineComponent, getUid } from '@/util'
import type { ComponentInternalInstance, InjectionKey } from 'vue'
import { computed, inject, onBeforeUnmount, provide, ref } from 'vue'
import { classicSelectStrategy, independentSelectStrategy } from './utils'

const VNestedSymbol: InjectionKey<any> = Symbol.for('vuetify:nested')

const noopTransforms = {
  in: (v: any) => v ?? new Map(),
  out: (v: any) => v,
}

const createNested = (props: any, parent?: any) => {
  const children = ref(new Map<string, string[]>())
  const parents = ref(new Map<string, string>())
  // const opened = ref<Set<string>>(new Set())
  // const selected = ref(new Map<tring, 'on' | 'off' | 'indeterminate'>())

  const opened = useProxiedModel(
    props,
    'opened',
    props.opened,
    v => {
      return new Set(v)
    },
    v => {
      return v.values()
    }
  )

  const selectStrategy = (() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy

    switch (props.selectStrategy) {
      case 'independent': return independentSelectStrategy
      case 'classic':
      default: return classicSelectStrategy
    }
  })()

  const openStrategy = typeof props.openStrategy === 'function'
    ? props.openStrategy
    : function ({ id, value, opened }: { id: string, value: boolean, opened: Set<string> }) {
      value ? opened.add(id) : opened.delete(id)
      return opened
    }

  const selected = useProxiedModel(
    props,
    'selected',
    props.selected,
    v => selectStrategy.in(v, children.value, parents.value),
    v => selectStrategy.out(v, children.value, parents.value),
  )

  return {
    id: null,
    opened,
    selected,
    selectedValues: computed(() => {
      const arr = []

      for (const [key, value] of selected.value.entries()) {
        if (value === 'on') arr.push(key)
      }

      return arr
    }),
    register: (id: string, parentId: string, isGroup: boolean, vm: ComponentInternalInstance) => {
      parents.value.set(id, parentId)
      isGroup && children.value.set(id, [])

      if (parentId) {
        children.value.set(parentId, [...children.value.get(parentId) || [], id])
      }
    },
    unregister: (groupId: string) => {
      children.value.delete(groupId)
      parents.value.delete(groupId)
    },
    open: (id: string, value: boolean, e: Event) => {
      const newOpened = openStrategy({
        id,
        value,
        opened: opened.value,
        children: children.value,
        parents: parents.value,
        event: e,
      })

      newOpened && (opened.value = newOpened)
    },
    select: (id: string, value: boolean, e: Event) => {
      selected.value = selectStrategy.select({
        id,
        value,
        selected: new Map(selected.value),
        children: children.value,
        parents: parents.value,
        event: e,
      })
    },
  }
}

const useNestedItem = (props: any) => {
  const parent = inject(VNestedSymbol)

  const value = props.value ?? getUid()

  const item = {
    ...parent,
    value,
    isSelected: computed(() => parent.selected.value.get(value) === 'on'),
  }

  parent.register(value, parent.value, false)

  onBeforeUnmount(() => {
    parent.unregister(value)
  })

  return item
}

const useNested = props => {
  const root = createNested(props, null)

  provide(VNestedSymbol, root)

  return root
}

const useNestedGroup = props => {
  const parent = inject(VNestedSymbol)

  const value = props.value ?? getUid()

  const group = {
    ...parent,
    value,
    isOpen: computed(() => parent.opened.value.has(value)),
    isSelected: computed(() => parent.selected.value.get(value) === 'on'),
    isIndeterminate: computed(() => parent.selected.value.get(value) === 'indeterminate'),
  }

  parent.register(value, parent.value, true)

  onBeforeUnmount(() => {
    parent.unregister(value)
  })

  provide(VNestedSymbol, group)

  return group
}

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
    const { select, isSelected, value } = useNestedItem(props)

    return () => (
      <VNestedSimpleItem
        selected={isSelected.value}
        onClick:select={e => select(value, e.target.checked, e)}
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
    const { isOpen, isSelected, isIndeterminate, open, select, value } = useNestedGroup(props)
    return () => (
      <div class="v-nested-group">
        <div class="header">
          <VNestedSimpleItem
            header
            selected={isSelected.value}
            indeterminate={isIndeterminate.value}
            onClick:select={e => select(value, e.target.checked, e)}
            open={isOpen.value}
            onClick:open={e => open(value, e.target.checked, e)}
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
          <div>{[...nested.opened.value.values()].join(', ')}</div>
        </div>
        <div>
          <div>SELECTED</div>
          <div>{nested.selectedValues.value.join(', ')}</div>
        </div>
      </div>
    )
  },
})
