<template lang="pug">
  a(
    class="tabs__tab",
    v-bind:class="classes",
    v-bind:href="href",
    @click.prevent="click"
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
      target: {
        type: String,
        required: true
      },

      selected: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'tabs__tab--active': this.active
        }
      },

      events () {
        return [
          [`tab:activate:${this.$parent.id}`, this.activate]
        ]
      },

      href () {
        return `#${this.target}`
      }
    },

    mounted () {
      if (this.selected) {
        this.active = true

        this.$vuetify.load.call(this, this.click)
      }
    },

    methods: {
      activate (uid) {
        this.active = uid === this._uid
      },

      click () {
        this.$vuetify.bus.pub(`tab:open:${this.$parent.id}`, this.target, this._uid)
      }
    }
  }
</script>