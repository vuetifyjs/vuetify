<script>
  // Utilities
  import { goTo } from '@/util/helpers'
  import { mapState } from 'vuex'
  import { getObjectValueByPath } from 'vuetify/es5/util/helpers'
  import upperFirst from 'lodash/upperFirst'
  import camelCase from 'lodash/camelCase'

  export default {
    props: {
      discovery: {
        type: Boolean,
        default: false
      },
      threshold: {
        type: [Number, String],
        required: true
      }
    },

    data: () => ({
      activeIndex: 0,
      currentOffset: 0,
      isBooted: false,
      list: [],
      timeout: null
    }),

    computed: {
      ...mapState('app', ['tablesOfContents']),
      ...mapState('route', ['name']),
      items () {
        const [ section, name ] = this.name.split('/')
        const kebab = upperFirst(camelCase(section))

        return getObjectValueByPath(
          this.tablesOfContents,
          `${kebab}.${name}`,
          []
        ).map(item => ({
          ...item,
          offsetTop: 0,
          target: null
        }))
      }
    },

    watch: {
      items: 'genList',
      isBooted (val) {
        val && this.genList()
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
          attrs: { href: id },
          domProps: { innerText: this.$t(item.text) },
          style: {
            borderColor: isActive ? 'inherit' : null
          },
          on: {
            click (e) {
              e.stopPropagation()
              e.preventDefault()

              goTo.call(vm, index && id)
            }
          },
          key: `${item.text}-${index}`
        })

        return this.$createElement('li', [link])
      },
      async genList () {
        const list = []

        if (!this.isBooted) return list

        // Give page time to transition
        await new Promise(resolve => setTimeout(resolve, 300))

        for (const item of this.items) {
          const target = this.findTarget(item)

          if (!target) continue

          list.push({
            ...item,
            target,
            offsetTop: 0
          })
        }

        this.list = list
      },
      getItemOffset (item) {
        if (item.offsetTop) return

        if (!item.target) {
          item.target = this.findTarget(item)
        }

        if (!item.target) {
          return console.log(`Unable to find item ${item.href}`)
        }

        item.offsetTop = item.target.offsetTop
      },
      findActiveIndex () {
        if (this.currentOffset < 100) {
          this.activeIndex = 0
          return
        }

        const list = this.list.slice().reverse()
        const index = list.findIndex(item => {
          this.getItemOffset(item)

          return item.offsetTop - 100 < this.currentOffset
        })

        const lastIndex = list.length

        this.activeIndex = index > -1
          ? lastIndex - 1 - index
          : lastIndex
      },
      findTarget (item) {
        return item.target ||
          document.getElementById(item.href)
      },
      onScroll () {
        this.currentOffset = window.pageYOffset ||
          document.documentElement.offsetTop

        clearTimeout(this.timeout)

        this.timeout = setTimeout(this.findActiveIndex, 10)
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
        children = children.concat(this.list.map(this.genItem))
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
    margin: 0
    padding: 32px 0 0
    width: 100%

    li a.body-2
      border-left: 2px solid transparent
      padding-left: 16px
      text-decoration: none
      transition: color .1s ease-in
</style>
