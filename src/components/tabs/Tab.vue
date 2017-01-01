<template lang="pug">
  a(
    class="tabs__tab"
    v-bind:class="classes"
    v-bind:href="href"
    v-on:click.prevent="click"
    v-ripple="ripple"
  )
    slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'tab',

    data () {
      return {
        active: false
      }
    },

    mixins: [Eventable],

    props: {
      href: {
        type: String,
        required: true
      },

      ripple: {
        type: [Boolean, Object],
        default: false
      },

      selected: Boolean
    },

    computed: {
      classes () {
        return {
          'tabs__tab--active': this.active
        }
      },

      events () {
        return [
          ['tab:open', this.activate]
        ]
      },

      target () {
        return this.href.replace('#', '')
      }
    },

    mounted () {
      if (this.selected || window.location.hash.substr(1) === this.target) {
        this.$vuetify.load(this.click)
      }
    },

    methods: {
      activate (target) {
        this.active = target === this.target
      },

      click () {
        this.$vuetify.bus.pub('tab:open', this.target)
      }
    }
  }
</script>