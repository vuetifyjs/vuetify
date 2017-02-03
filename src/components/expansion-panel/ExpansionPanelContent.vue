<template lang="pug">
  li
    div(
      class="expansion-panel__header"
      v-bind:class="classes"
      v-click-outside="closeConditional"
      v-on:click="isActive = !isActive"
      v-if="$slots.header"
    )
      slot(name="header")

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
  import { addOnceEventListener } from '../../util/helpers'

  export default {
    name: 'expansion-panel-content',

    mixins: [Toggleable],

    data () {
      return {
        height: 'auto'
      }
    },

    computed: {
      classes () {
        return {
          'expansion-panel__header--active': this.isActive
        }
      },
      styles () {
        return {
          height: `${this.height}px`
        }
      }
    },

    methods: {
      closeConditional (e) {
        return this.$parent.$el.contains(e.target) && !this.$parent.expand
      },

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
      },

      toggle () {
        this.isActive = !this.isActive
      }
    }
  }
</script>