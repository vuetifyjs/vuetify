<template lang="pug">
  li(class="navbar__group")
    a(
      class="navbar__group-header"
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
      v-navbar-items(
        v-bind:class="groupClass"
        v-show="opened"
        v-bind:items="items"
        v-bind:ripple="ripple"
        v-bind:router="router"
        ref="group"
      )
        slot
</template>

<script>
  import Eventable from '../../mixins/eventable'
  import Transitionable from '../../mixins/transitionable'
  import { closestParentTag, addOnceEventListener, browserTransform } from '../../util/helpers'

  export default {
    name: 'navbar-group',

    mixins: [Eventable, Transitionable],

    data () {
      return {
        active: false,
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
          'navbar__group-header--active': this.active || this.opened
        }
      },

      events () {
        return [
          ['common', 'bodyClick', this.close, { deep: true }],
          ['navbar', this.navbarUid, this.close, { deep: true }]
        ]
      },

      navbarUid () {
        const navbar = closestParentTag.call(this, 'v-navbar')

        return navbar ? navbar._uid : null
      }
    },

    mounted () {
      if (this.$refs.group.$el.querySelector('.navbar__item--active')) {
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
        this.opened = true
      },

      toggle () {
        this.opened = !this.opened
      },

      close (e) {
        if ((!e || !e.target) ||
          e.target === this.$el ||
          this.$el.contains(e.target) &&
          !this.$refs.group.$el.contains(e.target)
        ) {
          return
        }

        this.opened = false
      }
    }
  }
</script>