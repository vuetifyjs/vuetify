import Vue from 'vue'
import { VListTileAction } from '@/components/VList'
import { test } from '@/test'

test('VListTileAction.js', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VListTileAction, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with static class and match snapshot', () => {
    const wrapper = mount(VListTileAction, functionalContext({
      staticClass: 'static-class'
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with many children and match snapshot', () => {
    const content1 = mount(Vue.component('content1', {
      render: h => h('div')
    })).vNode
    const content2 = mount(Vue.component('content2', {
      render: h => h('span')
    })).vNode
    const wrapper = mount(VListTileAction, functionalContext({}, [content1, content2]))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with one children and match snapshot', () => {

    const visible = mount(Vue.component('visible', {
      render: h => { if(true) return h('div') }
    })).vNode
    const notVisible = mount(Vue.component('notVisible', {
      render: h => { if(false) return h('span') }
    })).vNode

    const wrapper = mount(VListTileAction, functionalContext({}, [visible, notVisible]))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work with v-html', () => {
    const wrapper = mount(VListTileAction, {
      context: Object.assign({
        domProps: {
          innerHTML: '<b>something</b>'
        },
        data: {},
        props: {}
      })
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
