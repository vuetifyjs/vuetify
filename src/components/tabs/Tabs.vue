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
  import Storable from '../../mixins/storable'

  export default {
    name: 'tabs',

    mixins: [Storable, Eventable],

    data () {
      return {
        childrenCount: 0,
        index: null,
        items: [],
        reverse: false
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

      defaultState () {
        return {
          click: null,
          resize: null,
          active: {
            target: null,
            reverse: false
          },
          location: {
            width: null,
            offset: null
          }
        }
      },

      events () {
        return [
          ['tabs', `${this._uid}.click`, this.tabClick]
        ]
      }
    },

    watch: {
      index (i) {
        this.$vuetify().event('tabs.toggle', {
          id: this._uid,
          component: 'tabs',
          active: {
            target: this.items[i].id,
            reverse: this.reverse
          }
        })
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
          this.reverse = nextIndex < this.index
          this.index = nextIndex
        })
      }
    }
  }
</script>