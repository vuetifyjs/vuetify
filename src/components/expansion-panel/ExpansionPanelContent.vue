<template lang="pug">
  li
    div(
      class="expansion-panel__header"
      v-bind:class="classes"
      v-click-outside="closeConditional"
      v-on:click="isActive = !isActive"
      v-if="$slots.header"
      v-ripple="ripple"
    )
      slot(name="header")

    transition(
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:leave="leave"
    )
      div(
        class="expansion-panel__body"
        v-show="isActive"
        ref="body"
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

    props: {
      ripple: Boolean
    },

    computed: {
      classes () {
        return {
          'expansion-panel__header--active': this.isActive
        }
      }
    },

    mounted () {
      // TODO: This is temporary, replace
      if (this.value) {
        this.$vuetify.load(() => {
          setTimeout(() => {
            this.$refs.body.style.height = `${this.$refs.body.clientHeight}px`
          }, 1000)
        })
      }
    },

    methods: {
      afterEnter (el) {
        el.style.height = 'auto'
      },

      closeConditional (e) {
        return this.$parent.$el.contains(e.target) && 
          !this.$parent.expand &&
          !this.$el.contains(e.target)
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