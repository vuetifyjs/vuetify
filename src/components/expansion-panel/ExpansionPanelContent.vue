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
  import Expand from '../../mixins/expand-transition'
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'expansion-panel-content',

    mixins: [Expand, Toggleable],

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
      closeConditional (e) {
        return this.$parent.$el.contains(e.target) && 
          !this.$parent.expand &&
          !this.$el.contains(e.target)
      },

      toggle () {
        this.isActive = !this.isActive
      }
    }
  }
</script>