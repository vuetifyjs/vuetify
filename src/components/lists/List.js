export default {
  name: 'list',

  props: {
    dense: Boolean,

    items: {
      type: Array,
      default: () => []
    },

    threeLine: Boolean,

    twoLine: Boolean,

    ripple: Boolean,

    router: Boolean
  },

  computed: {
    classes () {
      return {
        'list': true,
        'list--two-line': this.twoLine,
        'list--dense': this.dense,
        'list--three-line': this.threeLine
      }
    }
  },

  render (createElement) {
    let children = []
    let data = { 
      'class': this.classes,
      attrs: {
        'data-uid': this._uid
      }
    }

    if (this.items.length) {
      this.items.forEach(obj => {
        if (obj.header) {
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
            createElement('v-list-row', {}, [
              createElement('v-list-tile', {
                props: { 
                  item: obj,
                  ripple: this.ripple || obj.ripple,
                  router: this.router || obj.router
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