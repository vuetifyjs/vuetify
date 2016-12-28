<template lang="pug">
  li(class="sidebar__group")
    a(
      class="sidebar__group-header"
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

    mixins: [Eventable],

    data () {
      return {
        active: false,
        height: 0
      }
    },

    props: {
      item: {
        type: Object,
        default () {
          return {
            parent: { href: '#!', text: '', icon: false },
            items: []
          }
        }
      }
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
        let sidebar = closest.call(this, 'sidebar')

        return sidebar ? sidebar.id : null
      }
    },

    mounted () {
      // console.log(this.$refs.group)
      if (this.$refs.group.$el.querySelector('.sidebar__item--active')) {
        this.active = true
      }
    },

    methods: {
      enter (el, done) {
        el.style.display = 'block'
        el.style.height = 0
        
        setTimeout(() => el.style.height = `${el.scrollHeight}px`, 0)

        var transition = () => {
          done()
          el.removeEventListener('transitionend', transition, false)
        }
        
        el.addEventListener('transitionend', transition, false)
      },

      leave (el, done) {
        el.style.height = 0
        
        var transition = () => {
          done()
          el.removeEventListener('transitionend', transition, false)
        }
        
        el.addEventListener('transitionend', transition, false)
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