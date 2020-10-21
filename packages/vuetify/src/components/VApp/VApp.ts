/* eslint-disable vue/one-component-per-file */
// Styles

import mergeData, { mergeStyles } from '../../util/mergeData'
import type {
  InjectionKey,
  InjectionKey,
} from 'vue'
import {
  defineComponent,
  h,
  inject,
  getCurrentInstance,
  mergeProps,
  onMounted,
  provide,
  ref,
} from 'vue'
import { convertToUnit } from '../../util/helpers'

export const VuetifyAppKey: InjectionKey<any> = Symbol.for('vuetify-app')

export default defineComponent({
  name: 'VApp',

  setup (_, { slots }) {
    // Keeps track of the current
    // position of all layout items
    const data = ref({
      area: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      groups: [] as object[][],
    })

    provide(VuetifyAppKey, {
      register (props: Record<any, unknown>, update) {
        const group = Number(props.group)
        const groups: object[][] = data.value.groups.slice()
        const registree = { ...props, update }

        if (group == null) {
          groups.push([registree])
        } else {
          groups[group] = groups[group] ?? []

          groups[group].push(registree)
        }

        data.value.groups = groups
        data.value.area = updateArea(data)
      },
    })

    return () => (
      h('div', {}, slots.default?.())
    )
  },
})

// eslint-disable-next-line max-statements
function updateStyles (data) {
  let top = 0
  let right = 0
  let bottom = 0
  let left = 0

  for (const group of data.value.groups) {
    if (!group) continue

    for (const item of group) {
      const { height, position, width } = item
      const isTop = position === 'top'
      const isRight = position === 'right'
      const isBottom = position === 'bottom'
      const isLeft = position === 'left'
      const isYAxis = isTop || isBottom

      item.update({
        bottom: isTop ? 'auto' : convertToUnit(bottom),
        height: isYAxis ? convertToUnit(height) : undefined,
        left: isRight ? 'auto' : convertToUnit(left),
        right: isLeft ? 'auto' : convertToUnit(right),
        top: isBottom ? 'auto' : convertToUnit(top),
        width: !isYAxis ? convertToUnit(width) : undefined,
      })

      if (isTop) {
        top += Number(height)
      } else if (isRight) {
        right += Number(width)
      } else if (isBottom) {
        bottom += Number(height)
      } else if (isLeft) {
        left += Number(width)
      }
    }
  }

  return { top, right, bottom, left }
}

export const VLayout = defineComponent({
  name: 'VLayout',

  props: {
    group: String,
    height: String,
    position: String,
    priority: String,
    width: String,
  },

  setup (props, { slots, attrs }) {
    const style = ref({})

    onMounted(() => {
      const app = inject(VuetifyAppKey)

      app.register(props, styles => style.value = styles)
    })

    attrs = mergeData(attrs, {
      class: ['v-app'],
      dataApp: true,
      style: style.value,
    })
    console.log('setting up v-layout component')

    return () => (
      h('div', mergeProps(attrs, {
        class: 'v-layout',
        style: style.value,
      }), slots.default?.())
    )
  },
})
