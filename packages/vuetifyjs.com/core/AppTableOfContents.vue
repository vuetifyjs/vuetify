<script>
  export default {
    name: 'app-table-of-contents',

    data: () => ({
      activeIndex: 0,
      currentOffset: 0,
      isBooted: false,
      position: 'relative',
      right: 0,
      top: 0,
      list: [],
      targets: []
    }),

    props: {
      discovery: Boolean,
      items: {
        type: Array,
        default: () => ([])
      },
      offset: {
        type: [Number, String],
        required: true
      },
      threshold: {
        type: [Number, String],
        required: true
      }
    },

    computed: {
      styles () {
        return {
          position: this.position,
          top: `${parseInt(this.top)}px`
        }
      }
    },

    mounted () {
      this.genList()
    },

    methods: {
      genItem (item, index) {
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
        const targets = []
        const list = this.items.map(item => {
          item = Object.assign({}, item)
          const target = this.isBooted && item.target
            ? item.target
            : document.getElementById(item.href)
          const offsetTop = target.offsetTop - 300

          item.offsetTop = offsetTop
          item.target = target

          targets.push(offsetTop)

          return item
        })

        this.list = list
        this.targets = targets.sort((a, b) => a - b)
      },
      onScroll () {
        const offset = window.pageYOffset ||
          document.documentElement.offsetTop
        this.genList()

        if (document.body.clientHeight - offset - window.innerHeight < 25) {
          return (this.activeIndex = this.targets.length - 1)
        }

        const shouldFloat = offset >= this.threshold

        this.position =  shouldFloat ? 'fixed' : 'relative'
        this.top = shouldFloat ? this.offset : 0
        this.currentOffset = offset

        let activeIndex = 0
        this.targets.forEach((target, i) => {
          if (i === 0) {
            if (offset <= target) {
              activeIndex = i
            }
          } else if (offset >= target - 30 &&
            (!this.targets[i + 1] || offset <= this.targets[i + 1] + 30)
          ) {
            activeIndex = i
          }
        })

        this.activeIndex = activeIndex
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
    height: 200px
    list-style-type: none
    margin: 0 24px
    width: 200px
    
    li > a
      padding-left: 18px
      text-decoration: none
      border-left: 2px solid transparent
      transition: color .1s ease-in
</style>
