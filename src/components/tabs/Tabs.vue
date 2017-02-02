<template lang="pug">
  div(
    class="tabs"
    v-bind:class="classes"
    v-bind:id="id"
  )
    slot
    v-tabs-tabs(ref="activators")
      slot(name="activators")
      v-tabs-slider(ref="slider")

    v-tabs-items(class="tabs__items" ref="content")
      slot(name="content")
</template>

<script>
  export default {
    name: 'tabs',

    data () {
      return {
        activators: [],
        content: [],
        isActive: null,
        reverse: false,
        target: null
      }
    },

    props: {
      active: Number,

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
      }
    },

    watch: {
      active () {
        this.tabClick(this.activators[this.active].target)
      },

      isActive () {
        this.activators.forEach(i => i.toggle(this.target))
        this.content.forEach(i => i.toggle(this.target, this.reverse))
        this.$emit('active', this.isActive)
      }
    },

    mounted () {
      this.$vuetify().load(this.init)
    },

    methods: {
      init () {
        this.$refs.activators.$children.forEach(i => {
          if (i.$options._componentTag === 'v-tab-item') {
            this.activators.push(i)
          }
        })

        this.$refs.content.$children.forEach(i => this.content.push(i))
        this.tabClick(this.activators[0].target)
      },

      tabClick (target) {
        this.target = target

        this.$nextTick(() => {
          const nextIndex = this.content.findIndex(i => i.id === this.target)
          this.reverse = nextIndex > this.isActive ? false : true
          this.isActive = nextIndex
        })
      }
    }
  }
</script>