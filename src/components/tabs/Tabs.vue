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
        childrenCount: 0,
        index: null,
        items: [],
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
      }
    },

    watch: {
      index (i) {
        this.$vuetify.bus.pub(`tab:open:${this._uid}`, this.items[i].id, this.reversing)
      }
    },

    mounted () {
      this.$vuetify().load(this.init)
    },

    methods: {
      init () {
        this.getItems()
        this.index = 0
      },

      getItems () {
        if (this.$children.length === this.childrenCount) {
          return
        }

        this.childrenCount = this.$children.length
        this.items = this.$children.filter(i => i.$options._componentTag === 'v-tabs-item')
      },

      tabClick (target) {
        this.getItems()

        this.$nextTick(() => {
          const nextIndex = this.items.findIndex(i => i.$el.id === target)
          this.reversing = nextIndex > this.index
          this.index = nextIndex
        })
      }
    }
  }
</script>