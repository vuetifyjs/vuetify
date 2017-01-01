<template lang="pug">
  li(class="navbar__group")
    a(
      class="navbar__group-header"
      v-bind:class="classes"
      v-bind:href="item.href"
      v-on:click.prevent="toggle"
    )
      template(v-if="item.icon")
        v-icon {{ item.icon }}
      span(v-text="item.text")
    transition(
      v-on:enter="enter"
      v-on:leave="leave"
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
  import { closest, addOnceEventListener } from '../../util/helpers'

  export default {
    name: 'navbar-group',

    mixins: [Eventable],

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
          [`navbar-group:close:${this.navbar}`, this.close],
          [`navbar-group:open:${this.navbar}`, this.open]
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
      enter (el, done) {
        el.style.display = 'block'
        el.style.height = 0
        
        setTimeout(() => el.style.height = `${el.scrollHeight}px`, 0)

        addOnceEventListener(el, done, 'transitionend')
      },

      leave (el, done) {
        el.style.height = 0
        
        addOnceEventListener(el, done, 'transitionend')
      },

      open () {
        this.active = true
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