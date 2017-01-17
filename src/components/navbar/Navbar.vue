<template lang="pug">
  nav(
    class="navbar"
    v-bind:class="classes"
  )
    slot
    v-list(ref="list" v-if="items.length")
      v-list-row(v-for="item in items")
        div(v-if="item.header" v-html="item.header")
        v-list-tile(
          v-else
          v-bind:item="item"
          v-bind:router="router"
          v-bind:ripple="ripple"
        )
    slot(name="right")
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'navbar',

    mixins: [Eventable],

    data () {
      return {
        events: [],
        list: {}
      }
    },

    props: {
      fixed: Boolean,
      
      groupClass: {
        type: String,
        default: ''
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
          'navbar--fixed': this.fixed
        }
      }
    },

    mounted () {
      this.list = this.$children.find(i => i.$options._componentTag === 'v-list')

      if (this.list) {
        this.events = [
          [`list-tile:selected:${this.list._uid}`, this.itemClicked],
          ['body:click', this.close]
        ]
      }      

      this.$vuetify.bus.sub(this.events)
    },

    beforeDestroy () {
      if (this.list) {
        this.$vuetify.bus.unsub(this.events)
      }
    },

    methods: {
      close (e) {
        if (
          (!e || !e.target)
          || !this.$el.contains(e.target)
        ) {
          this.itemClicked()
        }
      },

      itemClicked () {
        this.$vuetify.bus.pub(`list:close:${this.list._uid}`)
      }
    }
  }
</script>