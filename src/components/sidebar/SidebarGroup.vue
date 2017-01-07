<template lang="pug">
  li(class="sidebar__group")
    a(
      class="sidebar__group-header"
      href="javascript:;"
      v-bind:class="classes"
      v-on:click.prevent="toggle"
      v-ripple="ripple || item.ripple === true"
    )
      template(v-if="item.icon")
        v-icon {{ item.icon }}
      span(v-text="item.text")
    transition(
      v-on:enter="enter"
      v-on:leave="leave"
    )
      v-sidebar-items(
        v-show="active"
        v-bind:class="groupClass"
        v-bind:items="items"
        v-bind:ripple="ripple"
        v-bind:router="router"
        ref="group"
      )
        slot
</template>

<script>
  import Eventable from '../../mixins/eventable'
  import { closestParentTag, addOnceEventListener } from '../../util/helpers'

  export default {
    name: 'sidebar-group',

    mixins: [Eventable],

    data () {
      return {
        active: false,
        height: 0
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
          return { text: '', icon: '', ripple: false }
        }
      },

      items: {
        type: Array,
        default: () => []
      },

      ripple: Boolean,

      router: Boolean
    },
    
    computed: {
      classes () {
        return {
          'sidebar__group-header--active': this.active
        }
      },

      events () {
        return [
          [`sidebar-group:close:${this.sidebar}`, this.close],
          [`sidebar-group:open:${this.sidebar}`, this.open]
        ]
      },

      sidebar () {
        let sidebar = closestParentTag.call(this, 'v-sidebar')

        return sidebar ? sidebar._uid : null
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
        let scrollHeight = el.scrollHeight
        el.style.height = 0
        
        setTimeout(() => el.style.height = `${scrollHeight}px`, 50)

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