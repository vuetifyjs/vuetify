import Vue from 'vue'
import { test } from '@/test'
import VSelectList from '@/components/VSelect/VSelectList'
import {
  VListTile,
  VListTileTitle,
  VListTileContent
} from '@/components/VList'

test('VSelect', ({ mount, compileToFunctions }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  it('should generate a divider', () => {
    const wrapper = mount(VSelectList)

    const divider = wrapper.vm.genDivider({
      inset: true
    })

    expect(divider.data.props.inset).toBe(true)
  })

  it('should generate a header', () => {
    const wrapper = mount(VSelectList)

    const divider = wrapper.vm.genHeader({
      light: true,
      header: 'foobar'
    })

    expect(divider.data.props.light).toBe(true)

    // Check that header exists
    expect(divider.children.length).toBe(1)
    expect(divider.children[0].text).toBe('foobar')
  })

  it('should use no-data slot', () => {
    const wrapper = mount(VSelectList, {
      slots: {
        'no-data': [{
          render: h => h('div', 'foo')
        }]
      }
    })
    expect(wrapper.vm.$slots['no-data'].length).toBe(1)
  })

  it('should generate children', () => {
    const wrapper = mount(VSelectList, {
      propsData: {
        items: [
          { header: true },
          { divider: true },
          'foo'
        ]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should return defined item value', () => {
    const wrapper = mount(VSelectList, {
      propsData: {
        itemValue: 'foo'
      }
    })

    const getValue = wrapper.vm.getValue

    expect(getValue({ fizz: 'buzz' })).toEqual({ fizz: 'buzz' })

    wrapper.setProps({ itemValue: 'fizz' })

    expect(getValue({ fizz: 'buzz' })).toEqual('buzz')
  })

  it('should use supplied item if cannot find path', () => {
    const wrapper = mount(VSelectList)
    const getPropertyFromItem = wrapper.vm.getPropertyFromItem

    expect(getPropertyFromItem({ foo: true }, 'foo.bar')).toEqual({ foo: true })
    expect(getPropertyFromItem({ foo: { bar: true }}, 'foo.bar')).toBe(true)
  })
})
