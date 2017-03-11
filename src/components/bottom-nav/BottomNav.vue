<script>
  export default {
    name: 'bottom-nav',

    render (h) {
      const data = {
        'class': this.classes,
        style: {
          width: `calc(100% / ${this.$slots.length})`
        },
        attrs: {
          id: 'bottom-nav'
        }
      }

      return h('div', data, this.$slots.default)
    },

    props: {
      value: Number,
      shift: Boolean,
      hidden: Boolean
    },

    data () {
      return {
        currentNav: null,
        children: [],
        nodesLabel: []
      }
    },

    computed: {
      classes () {
        return {
          'bottom-nav': true, // always on
          'bottom-nav--shift': this.shift,
          'bottom-nav--hidden': this.hidden
        }
      }
    },

    watch: {
      value () {
        this.currentNav = this.value
      },

      currentNav () {
        this.toggleActiveBtn()
        this.activateBtn(this.currentNav)
      }
    },

    mounted () {
      // #text nodes may be included in $slots
      this.children = this.$slots.default.filter(slot => {
        return slot.elm.nodeName === 'A'
      })

      for (let i=this.children.length; i--;) {
        if (i === this.value) {
          this.children[i].elm.classList.add('btn--nav-active')
          break
        }
      }
    },

    methods: {
      activateBtn (i) {
        if (i > this.children.length)
          return
        this.children[i].elm.classList.add('btn--nav-active')
      },

      toggleActiveBtn () {
        for (let i=this.children.length; i--;) {
          if (this.children[i].elm.classList.contains('btn--nav-active')) {
            this.children[i].elm.classList.remove('btn--nav-active')
            break
          }
        }
      }

    }
  }
</script>
