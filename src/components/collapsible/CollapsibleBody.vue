<template lang="pug">
  transition(
    v-on:enter="enter"
    v-on:leave="leave"
  )
    div(
      class="collapsible__body"
      v-bind:uid="_uid"
      v-show="active"
    )
      slot
</template>

<script>
  import Eventable from '../../mixins/eventable'
  import { addOnceEventListener, closestParentTag } from '../../util/helpers'

  export default {
    name: 'collapsible-body',

    mixins: [Eventable],

    data () {
      return {
        active: false
      }
    },

    computed: {
      events () {
        return [
          ['collapsible', this.rootId, this.toggle, { deep: true }]
        ]
      },

      rootId () {
        let root = closestParentTag.call(this, 'v-collapsible')

        return root ? root._uid : null
      }
    },

    methods: {
      enter (el, done) {
        el.style.height = null
        el.style.display = 'block'
        let height = `${el.clientHeight}px`
        el.style.height = 0
        
        setTimeout(() => {
          el.style.height = height
          addOnceEventListener(el, 'transitionend', done)
        }, 50)
      },

      leave (el, done) {
        el.style.height = 0

        addOnceEventListener(el, 'transitionend', done)
      },

      toggle (parent) {
        this.active = parent.items.includes(this._uid)
      }
    }
  }
</script>