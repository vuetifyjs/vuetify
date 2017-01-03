<template lang="pug">
  router-link(
    class="tabs__tab"
    active-class="tabs__tab--active"
    v-bind:class="classes"
    v-bind:exact="item.href === '/'"
    v-bind:to="item.href"
    v-on:click.native="click"
    v-if="router || item.router"
    v-ripple="ripple"
  )
    template(v-if="item.icon")
      v-icon {{ item.icon }}
    span(v-text="item.text")
    slot
  a(
    v-else
    class="tabs__tab"
    v-bind:class="classes"
    v-bind:href="item.href"
    v-on:click.prevent="click"
    v-ripple="ripple"
  )
    template(v-if="item.icon")
      v-icon {{ item.icon }}
    span(v-text="item.text")
    slot
</template>

<script>
  import Eventable from '../../mixins/eventable'
  import Itemable from '../../mixins/itemable'

  export default {
    name: 'tab',

    data () {
      return {
        active: false
      }
    },

    mixins: [Eventable, Itemable],

    props: {
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
          ['tab:open', this.activate],
          ['tab:resize', this.resize]
        ]
      },

      target () {
        return this.item.href.replace('#', '')
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

        if (!this.active) return

        this.$vuetify.load(this.location)
      },

      click () {
        this.$vuetify.bus.pub('tab:click', this.target)
      },

      location () {
        this.$vuetify.bus.pub('tab:location', this.$el.clientWidth, this.$el.offsetLeft)
      },

      resize () {
        if (this.active) {
          this.location()
        }
      }
    }
  }
</script>