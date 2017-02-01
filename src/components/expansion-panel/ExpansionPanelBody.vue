<template lang="pug">
  transition(
    v-on:enter="enter"
    v-on:leave="leave"
  )
    div(
      class="expansion-panel__body"
      v-show="isActive"
    )
      slot
</template>

<script>
  import Toggleable from '../../mixins/toggleable'
  import { addOnceEventListener, closestParentTag } from '../../util/helpers'

  export default {
    name: 'expansion-panel-body',

    mixins: [Toggleable],

    methods: {
      enter (el, done) {
        el.style.height = null
        el.style.display = 'block'
        const height = `${el.clientHeight}px`
        el.style.height = 0

        setTimeout(() => {
          el.style.height = height
          addOnceEventListener(el, 'transitionend', done)
        }, 50)
      },

      leave (el, done) {
        el.style.height = 0

        addOnceEventListener(el, 'transitionend', done)
      }
    }
  }
</script>