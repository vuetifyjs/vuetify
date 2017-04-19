import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'tab-item',

  mixins: [GenerateRouteLink],

  data () {
    return {
      isActive: false,
      defaultActiveClass: 'tab__item--active'
    }
  },
  inject:['tabs'],
  props: {
    activeClass: {
      type: String,
      default: 'tab__item--active'
    }
  },

  computed: {
    classes () {//console.log(this.$parent,this.$parent.$parent)
      return {
        'tab__item': true,
        'tab__item--active': this.tabs.active==this.$el,
        'tab__item--disabled': this.disabled
      }
    }
  },
  render (h) {
    const { tag, data } = this.generateRouteLink()
    let vm=this;
    return h('li', {on:{click(){vm.$parent.$emit('selected',vm.$el)}}}, [h(tag, data, [this.$slots.default])])
  }
}
