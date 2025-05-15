import { ExpandTransitionGenerator } from './expand-transition'

// Utilities
import { h, Transition } from 'vue'
import { defineComponent } from '@/util'

const expandBase = ExpandTransitionGenerator()

export const VTableExpandTransition = defineComponent({
  name: 'VTableExpandTransition',

  props: {
    columns: {
      type: Number,
      required: true,
    },
  },

  setup (props, { slots }) {
    function createHook (type: 'enter' | 'leave') {
      return function (el: Element, done: () => void) {
        const placeholder = document.createComment('placeholder')
        const tr = document.createElement('tr')
        const td = document.createElement('td')
        td.setAttribute('colspan', String(props.columns))
        td.style.padding = '0'
        td.style.height = 'auto'
        const wrapperRoot = document.createElement('div')
        const density = el.closest('.v-table')!.className.match(/v-table--density-([a-z]+)/)![1]
        wrapperRoot.classList.add('v-table', `v-table--density-${density}`)
        const wrapper = document.createElement('div')
        wrapper.classList.add('v-table__wrapper')
        const wrapperTable = document.createElement('table')
        const tbody = document.createElement('tbody')
        tr.append(td)
        td.append(wrapperRoot)
        wrapperRoot.append(wrapper)
        wrapper.append(wrapperTable)
        wrapperTable.append(tbody)
        if (type === 'enter') {
          wrapperRoot.classList.add('expand-transition-enter-active', 'expand-transition-enter-from')
          expandBase.onBeforeEnter(wrapperRoot)
        } else {
          wrapperRoot.classList.add('expand-transition-leave-active', 'expand-transition-leave-from')
        }
        el.parentNode!.insertBefore(placeholder, el)
        el.parentNode!.insertBefore(tr, placeholder)
        tbody.append(el)
        function onEnd () {
          placeholder.parentNode!.insertBefore(el, placeholder)
          tr.remove()
          placeholder.remove()
          done()
        }
        wrapperRoot.addEventListener('transitionend', onEnd)
        wrapperRoot.addEventListener('transitioncancel', onEnd)
        requestAnimationFrame(() => {
          if (type === 'enter') {
            wrapperRoot.classList.remove('expand-transition-enter-from')
            wrapperRoot.classList.add('expand-transition-enter-to')
            expandBase.onEnter(wrapperRoot)
          } else {
            wrapperRoot.classList.remove('expand-transition-leave-from')
            wrapperRoot.classList.add('expand-transition-leave-to')
            expandBase.onLeave(wrapperRoot)
          }
        })
      }
    }

    return () => (
      h(Transition, {
        css: false,
        onEnter: createHook('enter'),
        onLeave: createHook('leave'),
      }, slots.default)
    )
  },
})
