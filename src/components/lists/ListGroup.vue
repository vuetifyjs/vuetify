<template lang="pug">
  transition(
    v-on:enter="enter"
    v-on:leave="leave"
  )
    ul(
      class="list"
      v-bind:class="classes"
      v-show="active"
    )
      v-list-tile(
        v-for="item in items"
        v-bind:item="item"
        v-bind:ripple="ripple"
        v-bind:router="router"
      )
</template>
<script>
  import Eventable from '../../mixins/eventable'
  import { closestParentTag, addOnceEventListener } from '../../util/helpers'

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
          'list--group': true,
          'list--group--active': this.active
        }
      },

      events () {
        return [
          [`list-tile-group:toggle:${this.listUid}`, this.toggle],
          [`list-tile-group:open:${this.listUid}`, this.open],
        ]
      },

      listUid () {
        let list = closestParentTag.call(this, 'v-list')

        return list ? list._uid : null
      }
    },

    watch: {
      active (active) {
        if (!active) {
          this.$vuetify.bus.pub(`list-tile-group:closed:${this._uid}`)
        }
      }
    },

    methods: {
      open (uid) {
        this.active = this._uid === uid
      },

      toggle (uid) {
        if (this._uid !== uid) {
          return
        }

        this.active = !this.active
      },

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
      }
    }
  }
</script>