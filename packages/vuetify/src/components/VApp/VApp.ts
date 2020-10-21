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
/* eslint-disable vue/one-component-per-file */
// Styles

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
      groups: [] as object[],
    })

    provide(VuetifyAppKey, {
      register (props: Record<any, unknown>, update) {
        const group = Number(props.group)
        const groups = data.value.groups.slice()
        const registree = { ...props, update }

        if (group == null) {
          groups.push([registree])
        } else {
          groups[group] = groups[group] ?? []

          groups[group].push(registree)
        }

        data.value.groups = groups

        updateStyles(data)
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
      const style = {
        right: `${right}px`,
        top: `${top}px`,
        bottom: `${bottom}px`,
        left: `${left}px`,
        height: undefined,
        width: undefined,
      }

      if (item.position === 'top') {
        style.bottom = 'auto'
        style.height = `${item.height}px`

        top += Number(item.height)
      }

      if (item.position === 'right') {
        style.left = 'auto'
        style.width = `${item.width}px`

        right += Number(item.width)
      }

      if (item.position === 'bottom') {
        style.top = 'auto'
        style.height = `${item.height}px`

        bottom += Number(item.height)
      }

      if (item.position === 'left') {
        style.right = 'auto'
        style.width = `${item.width}px`

        left += Number(item.width)
      }

      item.update(style)
    }
  }
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

      app.register(props, styles => {
        console.log('registering')

        style.value = styles
      })
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
