<template lang="pug">
  li(class="sidebar__group")
    a(
      class="sidebar__item-header"
      v-bind:class="{ 'sidebar__item-header--active': active }"
      v-bind:href="item.href"
      v-on:click="toggle()"
    )
      v-icon(
        v-if="item.icon"
        v-text="item.icon"
      )
      span(v-text="item.text")
    transition(
      v-on:enter="enter"
      v-on:leave="leave"
    )
      ul(
        class="sidebar__items"
        v-show="active"
        ref="group"
      )
        slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'sidebar-group',

    mixins: [
      Eventable
    ],

    data () {
      return {
        active: false,
        height: 0
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
      }
    },

    mounted () {
      if (this.$refs.group.querySelector('.sidebar__item--active')) {
        this.active = true
      }
    },

    methods: {
      enter (el) {
        el.style.display = 'block'
        el.style.height = 0
        el.style.height = `${el.scrollHeight}px`
        this.$vuetify.bus.pub('sidebar-group:close', this._uid)
      },

      leave (el, done) {
        el.style.height = 0
      },

      toggle () {
        this.active = !this.active
      },

      close (uid = null) {
        if (uid !== this._uid) {
          this.active = false
        }
      }
    }
  }
</script>