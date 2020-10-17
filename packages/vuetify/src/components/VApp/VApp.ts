/* eslint-disable vue/one-component-per-file */
// Styles

import mergeData, { mergeStyles } from '../../util/mergeData'
import type { InjectionKey } from 'vue'
import {
  computed,
  defineComponent,
  h,
  inject,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  Prop,
  provide,
  ref,
  Ref,
  watch,
} from 'vue'

export const VuetifyAppKey: InjectionKey<any> = Symbol.for('vuetify-app')

function update (data) {
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
      }

      if (item.position === 'top') {
        style.bottom = 'auto'

        top += Number(item.height)
      }

      if (item.position === 'right') {
        style.right = 'auto'

        right += Number(item.width)
      }

      if (item.position === 'bottom') {
        style.top = 'auto'

        bottom += Number(item.height)
      }

      if (item.position === 'left') {
        style.right = 'auto'

        left += Number(item.height)
      }

      item.update(style)
    }
  }
}

export default defineComponent({
  name: 'VApp',

  setup (props, { slots }) {
    const data = ref({
      area: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      groups: [],
    })

    provide(VuetifyAppKey, {
      register (props, update) {
        const group = Number(props.group)
        const groups = data.value.groups.slice()

        if (group == null) {
          groups.push([])
        } else {
          if (!groups[group]) groups[group] = []

          groups[group].push({
            ...props,
            update,
          })
        }

        data.value.groups = groups

        update(data)
      },
    })

    return () => (
      h('div', {}, slots.default?.())
    )
  },
})

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

      app.register(props, value => {
        console.log(style.value)
      })
    })

    attrs = mergeData(attrs, {
      class: ['v-app'],
      dataApp: true,
      style: style.value,
    })

    return () => (
      h('div', attrs, slots.default?.())
    )
  },
})
