<template lang="pug">
  a(
    class="tabs__tab"
    v-bind:class="classes"
    v-bind:href="href"
    v-on:click.prevent="click"
  )
    slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    data () {
      return {
        active: false
      }
    },

    mixins: [
      Eventable
    ],

    props: {
      href: {
        type: String,
        required: true
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
      if (this.selected) {
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