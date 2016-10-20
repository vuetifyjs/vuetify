<template lang="pug">
  li(class="sidebar__group")
    a(
      class="sidebar__item-header grey--text text--lighten-2"
      v-bind:class="{ 'sidebar__item-header--active': this.active }"
      v-bind:href="item.href"
      v-on:click="toggle()"
      v-text="item.text"
    )
    ul(
      class="sidebar__items"
      v-bind:style="{ height: height + 'px' }"
      ref="collapse"
    )
      slot
</template>

<script>
  import Transitionable from '../../mixins/transitionable'
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'sidebar-group',

    mixins: [
      Transitionable,
      Eventable
    ],

    data () {
      return {
        active: false,
        height: 0,
      }
    },

    props: {
      item: Object,
      required: true
    },
    
    computed: {
      events () {
        return [
          ['sidebar-group:close', this.close]
        ]
      },

      transitions () {
        return [
          [this.$el.parentNode, () => this.transitioning = false]
        ]
      }

    },

    watch: {
      active (b) {
        this.transitioning = true

        if (b) {
          this.height = this.$refs.collapse.scrollHeight
        } else {
          this.height = 0
        }
      },
    },

    mounted () {
      if (this.$refs.collapse.querySelector('.sidebar__item--active')) {
        this.toggle()
      }
    },

    methods: {
      toggle () {
        if (!this.transitioning) {
          this.active = !this.active
        }

        this.$vuetify.bus.pub('sidebar-group:close', this._uid)
      },

      close (uid = null) {
        if (uid === this._uid) {
          return
        }

        this.active = false
      }
    }
  }
</script>