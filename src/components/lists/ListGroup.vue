<template lang="pug">
  div(
    class="list--group__container"
  )
    div(
      class="list--group__header"
      v-bind:class="classes"
      v-on:click="click"
    )
      slot(name="item")

    transition(
      v-on:enter="enter"
      v-on:leave="leave"
    )
      ul(
        class="list list--group"
        v-show="isActive"
        v-bind:style="styles"
        ref="group"
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
      },

      styles () {
        return {
          height: `${this.height}px`
        }
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
        if (this.group) {
          this.isActive = this.matchRoute(to.path)
        }
      }
    },

    mounted () {
      if (this.group) {
        this.isActive = this.matchRoute(this.$route.path)
      }

      if (this.isActive) {
        this.list.listClick(this._uid)
      }

      this.height = this.$refs.group.scrollHeight
    },

    methods: {
      click () {
        this.list.listClick(this._uid)
      },

      toggle (uid) {
        this.isActive = this._uid === uid
      },

      enter (el, done) {
        el.style.display = 'block'
        const scrollHeight = el.scrollHeight
        this.height = 0

        setTimeout(() => (this.height = scrollHeight), 50)

        addOnceEventListener(el, 'transitionend', done)
      },

      leave (el, done) {
        this.height = 0
        addOnceEventListener(el, 'transitionend', done)
      },

      matchRoute (to) {
        return to.match(this.group) !== null
      }
    }
  }
</script>