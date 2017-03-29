export default {
  name: 'tabs-item',

  data () {
    return {
      reverse: false
    }
  },

  props: {
    id: {
      type: String,
      required: true
    },
    transition: {
      type: String,
      default: 'v-tab-transition'
    },
    reverseTransition: {
      type: String,
      default: 'v-tab-reverse-transition'
    }
  },

  computed: {
    computedTransition () {
      return this.reverseTransition//Bug forward transtionts need to work too
      //return this.reverse ? this.reverseTransition : this.transition
    }
  },
  render (h) {
    return h(this.computedTransition, {}, [
      h('div', {
        'class': 'tabs__item',
        //technically this isn't needed since we acces the component Props
        domProps: { id: this.id },
    }, [this.$slots.default])])
  }
}
