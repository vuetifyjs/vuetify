import { createJavascriptTransition } from './createTransition'
import { ExpandTransitionGenerator } from './expand-transition'
import { getCurrentInstance, h, mergeProps, onMounted, Transition } from 'vue'
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
    const vm = getCurrentInstance()!

    function onEnter (el: Element, done: () => void) {
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
      wrapperRoot.classList.add('expand-transition-enter-active', 'expand-transition-enter-from')
      expandBase.onBeforeEnter(wrapperRoot)
      el.parentNode!.insertBefore(tr, el)
      tbody.append(el)
      function onEnd () {
        tr.parentNode!.insertBefore(el, tr)
        tr.remove()
        done()
      }
      wrapperRoot.addEventListener('transitionend', onEnd)
      wrapperRoot.addEventListener('transitioncancel', onEnd)
      requestAnimationFrame(() => {
        wrapperRoot.classList.remove('expand-transition-enter-from')
        wrapperRoot.classList.add('expand-transition-enter-to')
        expandBase.onEnter(wrapperRoot)
      })
    }

    function onLeave (el: Element, done: () => void) {
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
      wrapperRoot.classList.add('expand-transition-leave-active', 'expand-transition-leave-from')
      el.parentNode!.insertBefore(tr, el)
      tbody.append(el)
      function onEnd () {
        tr.parentNode!.insertBefore(el, tr)
        tr.remove()
        done()
      }
      wrapperRoot.addEventListener('transitionend', onEnd)
      wrapperRoot.addEventListener('transitioncancel', onEnd)
      requestAnimationFrame(() => {
        wrapperRoot.classList.remove('expand-transition-leave-from')
        wrapperRoot.classList.add('expand-transition-leave-to')
        expandBase.onLeave(wrapperRoot)
      })
    }

    return () => (
      h(Transition, {
        css: false,
        onEnter,
        onLeave,
      }, slots.default)
    )
  },
})

// export const VTableExpandTransition = createJavascriptTransition('table-expand-transition', {
//   ...expandBase,
//   appear: true,
//   css: false,
//   onEnter (el, done) {
//     const wrapper = document.createElement('div')
//     wrapper.style.width = '100%'
//     el.parentNode.insertBefore(wrapper, el)
//     wrapper.appendChild(el)
//     expandBase.onEnter(wrapper)
//   },
//   onAfterEnter (el) {
//     console.log(el)
//   },
// })
