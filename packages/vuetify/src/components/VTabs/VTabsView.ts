import Vue, { VNode } from 'vue'
import { consoleWarn } from '../../util/console'
import VTabsItems from './VTabsItems'
import VTabItem from './VTabItem'

const VTabsView = Vue.extend({
  name: 'VTabsView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    },
    mandatory: {
      type: Boolean,
      default: false
    }
  },
  render (h, ctx): VNode {
    const { props, parent } = ctx

    if (!parent._isMounted) {
      parent.$forceUpdate()
      return h()
    }

    const tabs = parent.$vuetify.application._tabs

    if (!tabs) {
      consoleWarn('<v-tabs app> not found', VTabsView, parent)
      const RouterView = Vue.component('RouterView')
      return RouterView.options.render.call(undefined, h, ctx)
    }

    const path = parent.$route.path
    const items = tabs.$refs.items.items

    return h(VTabsItems, {
      props: {
        value: path
      }
    }, items.map(item => {
      return h(VTabItem, {
        props: {
          value: item.value
        }
      }, [h(parent.$router.match(item.value).matched[0].components[props.name])])
    }))
  }
})

export default VTabsView
