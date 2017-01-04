<template lang="pug">
  div(
    class="tabs"
    v-bind:class="classes"
    v-bind:id="id"
  )
    slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'tabs',

    mixins: [Eventable],

    data () {
      return {
        index: null,
        reversing: false
      }
    },

    props: {
      centered: Boolean,
      
      grow: Boolean,

      icons: Boolean,

      scrollBars: Boolean
    },

    computed: {
      classes () {
        return {
          'tabs--centered': this.centered,
          'tabs--grow': this.grow,
          'tabs--icons': this.icons,
          'tabs--scroll-bars': this.scrollBars
        }
      },

      events () {
        return [
          [`tab:click:${this._uid}`, this.tabClick]
        ]
      },

      items () {
        return this.$children.filter(i => i.$options._componentTag === 'v-tabs-item')
      }
    },

    watch: {
      index (i) {
        this.$vuetify.bus.pub(`tab:open:${this._uid}`, this.items[i].id, this.reversing)
      }
    },

    mounted () {
      this.$vuetify.load(this.init)
    },

    activated () {
      this.$vuetify.load(this.init)
    },

    methods: {
      init () {
        this.index = 0
      },
      
      tabClick (target) {
        let nextIndex = this.items.findIndex(i => i.$el.id === target)
        this.reversing = nextIndex > this.index ? false : true
        this.index = nextIndex
      },
    }
  }
</script>