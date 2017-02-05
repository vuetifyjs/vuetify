<template lang="pug">
  li(
    class="toolbar__group"
    v-click-outside="closeConditional"
  )
    a(
      class="toolbar__group-header"
      href="javascript:;"
      v-bind:class="classes"
      v-on:click.prevent="open"
      v-ripple="ripple || item.ripple"
    )
      template(v-if="item.icon")
        v-icon {{ item.icon }}
      span(v-text="item.text")
    component(
      v-bind:is="transition"
      v-bind:origin="origin"
    )
      v-toolbar-items(
        v-bind:class="groupClass"
        v-show="isActive"
        v-bind:items="items"
        v-bind:ripple="ripple"
        v-bind:router="router"
        ref="group"
      )
        slot
</template>

<script>
  import Transitionable from '../../mixins/transitionable'
  import Toggleable from '../../mixins/toggleable'
  import { closestParentTag, addOnceEventListener, browserTransform } from '../../util/helpers'

  export default {
    name: 'toolbar-group',

    mixins: [Toggleable, Transitionable],

    data () {
      return {
        opened: false
      }
    },

    props: {
      groupClass: {
        type: String,
        default: ''
      },

      item: {
        type: Object,
        default () {
          return { text: '', icon: '' }
        }
      },

      items: {
        type: Array,
        default: () => []
      },

      ripple: Boolean,

      router: Boolean,

      transition: {
        type: String,
        default: 'v-slide-y-transition'
      }
    },

    computed: {
      classes () {
        return {
          'toolbar__group-header--active': this.active || this.opened
        }
      },

      toolbarUid () {
        const toolbar = closestParentTag.call(this, 'v-toolbar')

        return toolbar ? toolbar._uid : null
      }
    },

    mounted () {
      if (this.$refs.group.$el.querySelector('.toolbar__item--active')) {
        this.active = true
      }
    },

    methods: {
      enter (el, done) {
        browserTransform(el, 'scale(0)')
        el.style.display = 'block'
        el.style.height = `${el.scrollHeight}px`

        setTimeout(() => {
          browserTransform(el, 'scale(1)')
        }, 0)

        addOnceEventListener(el, done, 'transitionend')
      },

      leave (el, done) {
        browserTransform(el, 'scale(0)')

        addOnceEventListener(el, done, 'transitionend')
      },

      open () {
        this.isActive = true
      },

      toggle () {
        this.isActive = !this.isActive
      },

      closeConditional (e) {
        return true
      },

      close (e) {
        if ((!e || !e.target) ||
          e.target === this.$el ||
          this.$el.contains(e.target) &&
          !this.$refs.group.$el.contains(e.target)
        ) {
          return
        }

        this.isActive = false
      }
    }
  }
</script>