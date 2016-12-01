<template lang="pug">
  li(class="sidebar__group")
    a(
      class="sidebar__item-header"
      v-bind:class="{ 'sidebar__item-header--active': active }"
      v-bind:href="item.href"
      v-on:click.prevent="toggle()"
    )
      v-icon(
        v-if="item.icon"
      ) {{ item.icon }}
      span(v-text="item.text")
    transition(
      v-on:enter="enter"
      v-on:leave="leave"
    )
      v-sidebar-items(
        v-show="active"
        ref="group"
      )
        slot
</template>

<script>
  import Eventable from '../../mixins/eventable'
  import { closest } from '../../util/helpers'

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
          [`sidebar-group:close:${this.sidebar}`, this.close]
        ]
      },

      sidebar () {
        return closest.call(this, 'sidebar')
      }
    },

    mounted () {
      if (this.$refs.group.$el.querySelector('.sidebar__item--active')) {
        this.active = true
      }
    },

    methods: {
      enter (el, done) {
        el.style.display = 'block'
        el.style.height = 0
        el.style.height = `${el.scrollHeight}px`
        
        el.addEventListener('transitionend', done, { once: true })
      },

      leave (el, done) {
        el.style.height = 0
        el.addEventListener('transitionend', done, { once: true })
      },

      toggle () {
        this.active = !this.active
      },

      close (uid) {
        this.active = uid === this._uid
      }
    }
  }
</script>