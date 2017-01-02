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
      
      grow: Boolean
    },

    computed: {
      classes () {
        return {
          'tabs--grow': this.grow,
          'tabs--centered': this.centered
        }
      },

      events () {
        return [
          ['tab:click', this.tabClick]
        ]
      },

      items () {
        return this.$children.filter(i => i.$options._componentTag === 'v-tabs-item')
      }
    },

    watch: {
      index (i) {
        this.$vuetify.bus.pub('tab:open', this.items[i].id, this.reversing)
      }
    },

    mounted () {
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