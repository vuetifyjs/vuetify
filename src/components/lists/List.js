export default {
  name: 'list',

  data () {
    return {
      hasHeader: false
    }
  },

  props: {
    dense: Boolean,

    subHeader: Boolean,

    items: {
      type: Array,
      default: () => []
    },

    threeLine: Boolean,

    twoLine: Boolean,

    router: Boolean,

    ripple: Boolean,

    unshift: Boolean
  },

  computed: {
    classes () {
      return {
        'list': true,
        'list--two-line': this.twoLine,
        'list--dense': this.dense,
        'list--three-line': this.threeLine,
        'list--sub-header': this.subHeader || this.hasHeader
      }
    }
  },

  render (createElement) {
    const children = []
    const data = {
      'class': this.classes,
      attrs: {
        'data-uid': this._uid
      }
    }

    if (this.items.length) {
      this.items.forEach(obj => {
        if (obj.header) {
          if (!this.hasHeader) {
            this.hasHeader = true
          }

          children.push(
            createElement('v-list-sub-header', {
              'class': obj.class,
              attrs: {
                inset: obj.inset
              },
              domProps: {
                innerText: obj.header
              }
            })
          )
        } else if (obj.divider) {
          children.push(
            createElement('v-divider', {
              attrs: {
                inset: obj.inset,
                light: obj.light
              }
            })
          )
        } else {
          children.push(
            createElement('v-list-item', {}, [
              createElement('v-list-tile', {
                props: {
                  item: obj,
                  ripple: this.ripple || obj.ripple,
                  router: this.router || obj.router,
                  unshift: this.unshift
                }
              })
            ])
          )
        }
      })
    }

    children.push(this.$slots.default)

    return createElement('ul', data, children)
  }
}
