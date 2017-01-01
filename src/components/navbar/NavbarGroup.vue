<template lang="pug">
  li(class="navbar__group")
    a(
      class="navbar__group-header"
      v-bind:class="classes"
      v-bind:href="item.href"
      v-on:click.prevent="open"
    )
      template(v-if="item.icon")
        v-icon {{ item.icon }}
      span(v-text="item.text")
    component(
      v-bind:is="transition"
      v-bind:origin="origin"
    )
      v-navbar-items(
        v-show="active"
        v-bind:items="items"
        ref="group"
      )
        slot
</template>

<script>
  import Eventable from '../../mixins/eventable'
  import Transitionable from '../../mixins/transitionable'
  import { closest, addOnceEventListener, browserTransform } from '../../util/helpers'

  export default {
    name: 'navbar-group',

    mixins: [Eventable, Transitionable],

    data () {
      return {
        active: false
      }
    },

    props: {
      item: {
        type: Object,
        default () {
          return { href: '#!', text: '', icon: false }
        }
      },

      items: {
        type: Array,
        default: () => []
      }
    },
    
    computed: {
      classes () {
        return {
          'navbar__group-header--active': this.active
        }
      },

      events () {
        return [
          [`body:click`, this.close]
        ]
      },

      navbar () {
        let navbar = closest.call(this, 'navbar')

        return navbar ? navbar._uid : null
      }
    },

    mounted () {
      if (this.$refs.group.$el.querySelector('.navbar__item--active')) {
        this.active = true
      }
    },

    methods: {
      open () {
        this.active = true
      },

      toggle () {
      },

      close (e) {
        if ((!e || !e.target)
          || e.target === this.$el
          || this.$el.contains(e.target)
          && !this.$refs.group.$el.contains(e.target)
        ) {
          return
        }

        this.active = false
      }
    }
  }
</script>