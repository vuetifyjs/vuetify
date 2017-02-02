<template lang="pug">
  div(
    class="tabs"
    v-bind:class="classes"
    v-bind:id="id"
  )
    slot
    v-tabs-tabs
      slot(name="activators")
      v-tabs-slider(ref="slider")

    div(class="tabs__items")
      slot(name="content")
</template>

<script>
  export default {
    name: 'tabs',

    data () {
      return {
        tabCount: 0,
        index: null,
        tabs: [],
        content: [],
        reverse: false,
        target: null
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
      }
    },

    watch: {
      target () {
        this.$slots.activators.forEach(i => {
          i.componentInstance.isActive = i.componentInstance.target === this.target
        })
        this.$slots.content.forEach(i => {
          i.componentInstance.isActive = i.componentInstance.id === this.target
        })
      }
    },

    mounted () {
      this.$vuetify().load(this.init)
    },

    methods: {
      init () {
        this.tabClick(this.$slots.activators[0].componentInstance.target)
      },

      tabClick (target) {
        this.target = target
      }
    }
  }
</script>