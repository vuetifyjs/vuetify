import { test } from '@/test'
import { keyCodes } from '@/util/helpers'
import VTreeSelect from '@/components/VTreeSelect'

test('VTreeSelect.js', ({ mount, compileToFunctions }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  const staticTree = [
      {id: 1, name: 'foo', children: [
          {id: 2, name: 'bar'},
          {id: 3, name: 'baz'},
          {id: 4, name: 'wiz'}
      ]},
      {id:5 , name: 'Alex'},
      {id:6 , name: 'Petr'}
  ]

  it('should render correctly and match snapshot when toggle menu', async () => {
    const wrapper = mount(VTreeSelect, {
      propsData: {
        items: staticTree
      }
    })
    const icon = wrapper.first('.v-icon')
    const slot = wrapper.first('.v-input__slot')

    expect(wrapper.vm.isMenuActive).toBe(false)

    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)

    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)

    const treeview = wrapper.first('.v-treeview')
    expect(treeview.html()).toMatchSnapshot()


  })

})