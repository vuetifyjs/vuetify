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
        target: null,
        resizeDebounce: {},
        targetEl: null
      }
    },

    props: {
      active: String,

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
        this.tabClick(this.active)
      },

      isActive () {
        this.activators.forEach(i => {
          i.toggle(this.target)

          if (i.isActive) {
            this.slider(i.$el)
          }
        })

        this.content.forEach(i => i.toggle(this.target, this.reverse))
        this.$emit('active', this.target)
      }
    },

    mounted () {
      this.$vuetify.load(() => {
        this.init()
        window.addEventListener('resize', this.resize, false)
      })
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.resize, false)
    },

    methods: {
      init () {
        this.$refs.activators.$children.forEach(i => {
          if (i.$options._componentTag === 'v-tab-item') {
            this.activators.push(i)
          }
        })

        this.$refs.content.$children.forEach(i => this.content.push(i))

        setTimeout(() => {
          this.tabClick(this.activators[0].target)
        }, 200)
      },

      resize () {
        clearTimeout(this.resizeDebounce)

        this.resizeDebounce = setTimeout(() => {
          this.slider()
        }, 250)
      },

      slider (el) {
        this.targetEl = el || this.targetEl
        this.$refs.slider.style.width = `${this.targetEl.clientWidth}px`
        this.$refs.slider.style.left = `${this.targetEl.offsetLeft}px`
      },

      tabClick (target) {
        this.target = target

        this.$nextTick(() => {
          const nextIndex = this.content.findIndex(i => i.id === this.target)
          this.reverse = nextIndex > this.isActive
          this.isActive = nextIndex
        })
      }
    }
  }
</script>