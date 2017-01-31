<template lang="pug">
  div(class="list--group__container")
    slot(name="item")

    transition(
      v-on:enter="enter"
      v-on:leave="leave"
    )
      ul(
        class="list list--group"
        v-show="active"
      )
        slot
</template>
<script>
  import { closestParentTag, addOnceEventListener } from '../../util/helpers'

  export default {
    name: 'list-group',

    data () {
      return {
        active: false,
        height: 0
      }
    },

    computed: {
      classes () {
        return {
          // 'list--group__header': this.active
        }
      },

      listUID () {
        // return closestParentTag.call(this, 'v-list')._uid
      }
    },

    watch: {
      '$route' (to) {
        // if (this.router) {
        //   this.active = this.matchRoute(to.path)
        // }
      }
    },

    mounted () {
      console.log(this)
      // if (this.router) {
      //   this.active = this.matchRoute(this.$route.path)
      // }
    },

    methods: {
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
        return to.match(this.item.group) !== null
      },

      toggle () {
        this.active = !this.active
      }
    }
  }
</script>