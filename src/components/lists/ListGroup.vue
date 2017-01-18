<template lang="pug">
  div(class="list--group__container")
    v-list-tile(
      v-on:click.native="toggle"
      v-bind:class="classes"
      v-bind:ripple="ripple"
    )
      v-list-tile-action(v-if="item.action")
        v-icon {{ item.action }}
      v-list-tile-content
        v-list-tile-title {{ item.title }}
      v-list-tile-action
        v-icon keyboard_arrow_down

    transition(
      v-on:enter="enter"
      v-on:leave="leave"
    )
      ul(
        class="list list--group"
        v-show="active"
      )
        v-list-item(v-for="item in items")
          v-list-tile(
            v-bind:item="item"
            v-bind:ripple="ripple"
            v-bind:router="router"
          )
</template>
<script>
  import { closestParentTag, addOnceEventListener } from '../../util/helpers'
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'list-group',

    mixins: [Eventable],

    data () {
      return {
        active: false,
        height: 0
      }
    },

    props: {
      item: Object,

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
          'list--group__header': this.active
        }
      },

      listUID () {
        return closestParentTag.call(this, 'v-list')._uid
      },

      events () {
        return [
          [`list:close:${this.listUID}`, () => this.active = false]
        ]
      }
    },

    watch: {
      '$route' (to) {
        this.active = this.matchRoute(to.path)
      }
    },

    mounted () {
      if (this.router) {
        this.active = this.matchRoute(this.$route.path)
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

      matchRoute (to) {
        return to.match(this.item.group) !== null
      },

      toggle () {
        this.active = !this.active
      }
    }
  }
</script>