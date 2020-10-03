import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'v-list-item-action',

  setup (props, { attrs, slots }) {
    return () => {
      const children = slots.default?.()?.filter(vnode => {
        return vnode.isComment === false && vnode.text !== ' '
      })
      return h('div', {
        class: ['v-list-item__action', {
          'v-list-item__action--stack': children?.length! > 1
        }],
      }, children)
    }
  },
})
