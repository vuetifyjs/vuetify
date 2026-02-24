// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVSnackbarProps, VSnackbar } from '@/components/VSnackbar/VSnackbar'

// Composables
import { useSnackbarQueue } from './queue'
import { useDelay } from '@/composables/delay'
import { useDocumentVisibility } from '@/composables/documentVisibility'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed, mergeProps, ref, shallowRef, toRef, triggerRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType, VNodeProps } from 'vue'
import type { GenericProps } from '@/util'

export type VSnackbarQueueSlots<T extends string | SnackbarMessage> = {
  header: { item: T }
  item: { item: T }
  text: { item: T }
  actions: {
    item: T
    props: {
      onClick: () => void
    }
  }
}

export type SnackbarMessageDismissType =
  | 'dismissed'
  | 'cleared'
  | 'overflow'
  | 'auto'

export type SnackbarMessage =
  | string
  | (Omit<
    VSnackbar['$props'],
    | 'modelValue'
    | 'onUpdate:modelValue'
    | 'activator'
    | 'activatorProps'
    | 'closeDelay'
    | 'openDelay'
    | 'openOnClick'
    | 'openOnFocus'
    | 'openOnHover'
    | 'collapsed'
    | 'style'
    | '$children'
    | 'v-slots'
    | `v-slot:${string}`
    | keyof VNodeProps
  > & {
    style?: any
    collapsed?: { width: number, height: number }
    promise?: Promise<unknown>
    success?: (val?: unknown) => Exclude<SnackbarMessage, string>
    error?: (val?: Error) => Exclude<SnackbarMessage, string>
    onDismiss?: (reason: SnackbarMessageDismissType) => void
  })

export type SnackbarQueueItem = {
  id: number
  item: Exclude<SnackbarMessage, string>
  active: boolean
  onDismiss?: (reason: SnackbarMessageDismissType) => void
}

export const makeVSnackbarQueueProps = propsFactory({
  // TODO: Port this to Snackbar on dev
  closable: [Boolean, String],
  closeText: {
    type: String,
    default: '$vuetify.dismiss',
  },
  collapsed: Boolean,
  displayStrategy: {
    type: String as PropType<'overflow' | 'hold'>,
    default: 'hold',
  },
  modelValue: {
    type: Array as PropType<readonly SnackbarMessage[]>,
    default: () => [],
  },
  totalVisible: {
    type: [Number, String],
    default: 1,
  },
  gap: {
    type: [Number, String],
    default: 8,
  },
  ...omit(makeVSnackbarProps(), ['modelValue', 'collapsed']),
}, 'VSnackbarQueue')

export const VSnackbarQueue = genericComponent<new <T extends readonly SnackbarMessage[]> (
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (val: T) => void
  },
  slots: VSnackbarQueueSlots<T[number]>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSnackbarQueue',

  inheritAttrs: false,

  props: makeVSnackbarQueueProps(),

  emits: {
    'update:modelValue': (val: SnackbarMessage[]) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { t } = useLocale()
    const documentVisibility = useDocumentVisibility()
    const queue = useSnackbarQueue(props)

    const isHovered = shallowRef(false)
    const { runOpenDelay, runCloseDelay } = useDelay(
      { openDelay: 0, closeDelay: 500 },
      val => {
        isHovered.value = val
        updateDynamicProps()
      }
    )

    let _lastId = 0
    const visibleItems = ref<SnackbarQueueItem[]>([])
    const limit = toRef(() => Number(props.totalVisible))

    watch(() => props.modelValue.length, showNext)

    function removeItem (id: number) {
      visibleItems.value = visibleItems.value.filter(x => x.id !== id)
      if (visibleItems.value.length === 0) {
        isHovered.value = false
      }
      showNext()
    }

    function showNext () {
      if (!props.modelValue.length) return

      const activeCount = visibleItems.value.filter(x => x.active).length
      if (activeCount >= limit.value) {
        if (props.displayStrategy !== 'overflow') return

        // Dismiss oldest active items to make room
        visibleItems.value
          .filter(x => x.active)
          .slice(limit.value - 1)
          .forEach(item => {
            item.active = false
            item.onDismiss?.('overflow')
          })
      }

      const [next, ...rest] = props.modelValue
      emit('update:modelValue', rest)

      const item = typeof next === 'string' ? { text: next } : next
      const { promise, success, error, onDismiss, ...itemProps } = item

      const newItem: SnackbarQueueItem = {
        id: _lastId++,
        item: {
          ...promise ? { timeout: -1, loading: true } : {},
          ...itemProps,
        },
        active: true,
        onDismiss,
      }
      visibleItems.value.unshift(newItem)
      updateDynamicProps()

      promise?.then(
        (data: any) => {
          if (!newItem.active) return
          newItem.item = success?.(data) ?? { ...newItem.item, timeout: 1 }
          updateDynamicProps()
          triggerRef(visibleItems)
        },
        (data: any) => {
          if (!newItem.active) return
          newItem.item = error?.(data) ?? { ...newItem.item, timeout: 1 }
          updateDynamicProps()
          triggerRef(visibleItems)
        }
      )
    }

    function dismiss (id: number, reason: SnackbarMessageDismissType) {
      const item = visibleItems.value.find(x => x.id === id)
      if (!item) return
      item.active = false
      item.onDismiss?.(reason)
      updateDynamicProps()
    }

    function clear () {
      emit('update:modelValue', [])
      visibleItems.value
        .toReversed()
        .forEach((item, i) => setTimeout(() => {
          item.active = false
          item.onDismiss?.('cleared')
        }, 100 * i))
    }

    const btnProps = computed(() => ({
      color: typeof props.closable === 'string' ? props.closable : undefined,
      text: t(props.closeText),
    }))

    function updateDynamicProps () {
      let activeIndex = 0
      visibleItems.value.forEach(({ item, active }) => {
        item.queueIndex = activeIndex
        if (active) activeIndex++
      })

      if (!props.collapsed || isHovered.value) {
        visibleItems.value.forEach(({ item }) => item.collapsed = undefined)
        return
      }

      for (const { item } of visibleItems.value) {
        item.collapsed = item.queueIndex! > 0 ? {
          width: queue.lastItemSize.value.width,
          height: queue.lastItemSize.value.height,
        } : undefined
      }
    }

    watch(queue.lastItemSize, updateDynamicProps)
    watch(() => props.collapsed, updateDynamicProps)

    useRender(() => {
      const hasActions = !!(props.closable || slots.actions)
      const snackbarProps = omit(VSnackbar.filterProps(props as any), ['modelValue', 'collapsed'])
      const pauseAll = documentVisibility.value === 'hidden' || (props.collapsed && isHovered.value)

      return (
        <>
          { visibleItems.value.map(({ id, item, active }) => (
            slots.item
              ? (
                <VDefaultsProvider defaults={{ VSnackbar: item }}>
                  { slots.item({ item }) }
                </VDefaultsProvider>
              ) : (
                <VSnackbar
                  key={ id }
                  { ...attrs }
                  { ...snackbarProps }
                  { ...item }
                  { ...(pauseAll ? { timeout: -1 } : {}) }
                  queueGap={ Number(props.gap) }
                  contentProps={ mergeProps(snackbarProps.contentProps, {
                    onMouseenter: runOpenDelay,
                    onMouseleave: () => runCloseDelay(),
                  })}
                  modelValue={ active }
                  onUpdate:modelValue={ () => dismiss(id, 'auto') }
                  onAfterLeave={ () => removeItem(id) }
                >
                  {{
                    header: slots.header ? () => slots.header?.({ item }) : undefined,
                    text: slots.text ? () => slots.text?.({ item }) : undefined,
                    actions: hasActions ? () => (
                      <>
                        { !slots.actions ? (
                          <VBtn
                            { ...btnProps.value }
                            onClick={ () => dismiss(id, 'dismissed') }
                          />
                        ) : (
                          <VDefaultsProvider defaults={{ VBtn: btnProps.value }}>
                            { slots.actions({
                              item,
                              props: { onClick: () => dismiss(id, 'dismissed') },
                            })}
                          </VDefaultsProvider>
                        )}
                      </>
                    ) : undefined,
                  }}
                </VSnackbar>
              )
          ))}
        </>
      )
    })

    return {
      clear,
    }
  },
})

export type VSnackbarQueue = InstanceType<typeof VSnackbarQueue>
