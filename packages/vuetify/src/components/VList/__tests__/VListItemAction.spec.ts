// Components
import VListItemAction from '../VListItemAction'

// Utilities
import Vue from 'vue'
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { functionalContext } from '../../../../test'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VListItemAction.ts', () => {
  type Instance = ExtractVue<typeof VListItemAction>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VListItemAction, {
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction(functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with static class and match snapshot', () => {
    const wrapper = mountFunction(functionalContext({
      staticClass: 'static-class',
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with many children and match snapshot', () => {
    const content1 = mount(Vue.component('content1', {
      render: h => h('div'),
    })).vNode
    const content2 = mount(Vue.component('content2', {
      render: h => h('span'),
    })).vNode
    const wrapper = mountFunction(functionalContext({}, [content1, content2]))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with one children and match snapshot', () => {
    const visible = mount(Vue.component('visible', {
      render: h => { return h('div') || h() },
    })).vNode
    const notVisible = mount(Vue.component('notVisible', {
      render: h => { return h() || h('span') },
    })).vNode

    const wrapper = mountFunction(functionalContext({}, [visible, notVisible]))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work with v-html', () => {
    const wrapper = mountFunction({
      context: Object.assign({
        domProps: {
          innerHTML: '<b>something</b>',
        },
        data: {},
        props: {},
      }),
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
