import Vue from 'vue'
import { test } from '@/test'
import VSelect from '@/components/VSelect'
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
    const wrapper = mount(VSelect)

    const divider = wrapper.vm.genDivider({
      inset: true
    })

    expect(divider.data.props.inset).toBe(true)
  })

  it('should generate a header', () => {
    const wrapper = mount(VSelect)

    const divider = wrapper.vm.genHeader({
      light: true,
      header: 'foobar'
    })

    expect(divider.data.props.light).toBe(true)

    // Check that header exists
    expect(divider.children.length).toBe(1)
    expect(divider.children[0].text).toBe('foobar')
  })
})
