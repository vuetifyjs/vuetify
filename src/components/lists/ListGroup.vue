<template lang="pug">
  div(
    class="list--group__container" 
    v-click-outside="closeConditional"
  )
    div(
      class="list--group__header"
      v-bind:class="classes"
      v-on:click="toggle"
    )
      slot(name="item")

    transition(
      v-on:enter="enter"
      v-on:leave="leave"
    )
      ul(
        class="list list--group"
        v-show="isActive"
      )
        slot
</template>
<script>
  import { closestParentTag, addOnceEventListener } from '../../util/helpers'

  export default {
    name: 'list-group',

    data () {
      return {
        isActive: this.active,
        height: 0
      }
    },

    props: {
      active: Boolean,

      group: String
    },

    computed: {
      classes () {
        return {
          'list--group__header--active': this.isActive
        }
      },

      list () {
        return closestParentTag.call(this, 'v-list')
      }
    },

    watch: {
      active () {
        this.isActive = this.active
      },

      isActive () {
        if (this.isActive !== this.active) {
          this.$emit('active', this.active)
        }
      },

      '$route' (to) {
        if (this.router) {
          this.isActive = this.matchRoute(to.path)
        }
      }
    },

    mounted () {
      if (this.group) {
        this.isActive = this.matchRoute(this.$route.path)
      }
    },

    methods: {
      closeConditional (e) {
        return this.list.$el.contains(e.target)
      },

      enter (el, done) {
        el.style.display = 'block'
        const scrollHeight = el.scrollHeight
        el.style.height = 0

        setTimeout(() => (el.style.height = `${scrollHeight}px`), 50)

        addOnceEventListener(el, 'transitionend', done)
      },

      leave (el, done) {
        el.style.height = 0
        addOnceEventListener(el, 'transitionend', done)
      },

      matchRoute (to) {
        return to.match(this.group) !== null
      },

      toggle () {
        this.isActive = !this.isActive
      }
    }
  }
</script>