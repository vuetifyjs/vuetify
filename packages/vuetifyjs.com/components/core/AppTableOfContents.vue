<script>
  export default {
    name: 'AppTableOfContents',

    props: {
      discovery: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: () => ([])
      },
      threshold: {
        type: [Number, String],
        required: true
      }
    },

    data: () => ({
      currentOffset: 0,
      position: 'relative',
      right: 0,
      top: 0,
      list: [],
      isBooted: false
    }),

    computed: {
      activeIndex () {
        const list = this.list.slice().reverse()
        const index = list.findIndex(item => item.offsetTop - 100 < this.currentOffset)

        return index > -1
          ? list.length - 1 - index
          : 0
      },
      styles () {
        return {
          position: this.position,
          top: `${parseInt(this.top)}px`
        }
      }
    },

    watch: {
      isBooted () {
        this.genList()
      }
    },

    mounted () {
      setTimeout(() => {
        this.$el.setAttribute('data-booted', true)
        this.isBooted = true
      }, 200)
    },

    methods: {
      genItem (item, index) {
        item = item || {}
        const isActive = this.activeIndex === index

        return this.$createElement('li', [
          this.$createElement('router-link', {
            staticClass: 'subheading mb-3 d-block',
            'class': {
              'primary--text': isActive,
              'grey--text text--darken-1': !isActive
            },
            style: {
              borderLeft: `2px solid ${isActive ? this.$vuetify.theme.primary : 'transparent'}`
            },
            props: {
              to: { hash: `#${item.href}` }
            },
            domProps: {
              innerText: item.text
            }
          })
        ])
      },
      genList () {
        const list = []

        for (let item of this.items) {
          item = Object.assign({}, item)

          const target = item.target
            ? item.target
            : document.getElementById(item.href)

          if (target) {
            const offsetTop = target.offsetTop

            item.offsetTop = offsetTop
            item.target = target

            list.push(item)
          }
        }

        this.list = list
      },
      onScroll () {
        this.currentOffset = window.pageYOffset ||
          document.documentElement.offsetTop

        const shouldFloat = this.currentOffset >= this.threshold

        this.position = shouldFloat ? 'fixed' : 'relative'
        this.top = shouldFloat ? 85 : 0
        this.isBooted = true
      }
    },

    render (h) {
      const data = {
        staticClass: 'app-table-of-contents',
        style: this.styles,
        directives: [{
          name: 'scroll',
          value: this.onScroll
        }],
        attrs: this.$attrs,
        listeners: this.$listeners
      }

      let children = []

      if (this.list.length) {
        children = children.concat(this.list.map((item, i) => this.genItem(item, i)))
      }

      if (this.$slots.default) {
        children.push(this.$slots.default)
      }

      if (this.$slots.top) {
        children.unshift(this.$slots.top)
      }

      return h('ul', data, children)
    }
  }
</script>

<style lang="stylus">
  .app-table-of-contents
    list-style-type: none
    margin: 0 24px
    width: 200px

    li > a
      padding-left: 18px
      text-decoration: none
      border-left: 2px solid transparent
      transition: color .1s ease-in
</style>
