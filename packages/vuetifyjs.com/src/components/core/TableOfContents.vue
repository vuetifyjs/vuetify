<script>
  import { goTo } from '@/util/helpers'

  export default {
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
      isBooted: false,
      timeout: null
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
      },
      list () {
        const list = []

        if (!this.isBooted) return list

        for (let item of this.items) {
          item = Object.assign({}, item)

          const target = item.target ||
            document.getElementById(item.href)

          if (target) {
            item.offsetTop = target.offsetTop
            item.target = target

            list.push(item)
          }
        }

        return list
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
        const vm = this
        const id = `#${item.href}`

        const link = this.$createElement('a', {
          staticClass: 'body-2 mb-3 d-block',
          'class': {
            'primary--text': isActive,
            'grey--text text--darken-1': !isActive
          },
          style: {
            borderLeft: `2px solid ${isActive ? this.$vuetify.theme.primary : 'transparent'}`
          },
          attrs: { href: id },
          domProps: { innerText: this.$t(item.text) },
          on: {
            click (e) {
              e.stopPropagation()
              e.preventDefault()

              goTo.call(vm, index && id)
            }
          }
        })

        return this.$createElement('li', [
          this.$createElement('translation-translatable', {
            props: {
              i18n: item.text
            }
          }, [link])
        ])
      },
      onScroll () {
        clearTimeout(this.timeout)

        this.currentOffset = window.pageYOffset ||
          document.documentElement.offsetTop

        const shouldFloat = this.currentOffset >= this.threshold

        this.position = shouldFloat ? 'fixed' : 'relative'
        this.top = shouldFloat ? 85 : 0

        this.timeout = setTimeout(() => {
          this.isBooted = true
        }, 100)
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

    li a.body-2
      padding-left: 18px
      text-decoration: none
      border-left: 2px solid transparent
      transition: color .1s ease-in

    li:last-child
      margin-top: 24px
</style>
