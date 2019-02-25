import { test } from '@/test'
import { keyCodes } from '@/util/helpers'
import VTreeSelect from '@/components/VTreeSelect/VTreeSelect'

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

  const staticTreeAlter = [
    {id: 1, firstName: 'Ivan', position: 'head', children: [
        {id: 2, firstName: 'Fred', position: 'manager'},
        {id: 3, firstName: 'Vitaly', position: 'sales'}
    ]},
    {id:4 , firstName: 'Mary', position: 'accountant'},
    {id:5 , firstName: 'Lisa', position: 'PR'}
  ]

  it('should render correctly and match snapshot when toggle menu', async () => {
    const wrapper = mount(VTreeSelect, {
      propsData: {
        items: staticTree
      }
    })
    const slot = wrapper.first('.v-input__slot')

    expect(wrapper.vm.isMenuActive).toBe(false)

    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)

    await wrapper.vm.$nextTick()

    const treeview = wrapper.first('.v-tree-view-selector')
    expect(treeview.html()).toMatchSnapshot()
  })

  it('should render correctly and match snapshot with openAll items', async () => {
    const wrapper = mount(VTreeSelect, {
      propsData: {
        items: staticTree,
        openAll: true
      }
    })
    const slot = wrapper.first('.v-input__slot')
    slot.trigger('click')

    await wrapper.vm.$nextTick()

    const treeview = wrapper.first('.v-tree-view-selector')
    expect(treeview.html()).toMatchSnapshot()
  })

  it('should render correctly and match snapshot with ItemText props custom', async () => {
    const wrapper = mount(VTreeSelect, {
      propsData: {
        items: staticTreeAlter
      }
    })
    const slot = wrapper.first('.v-input__slot')
    slot.trigger('click')

    await wrapper.vm.$nextTick()

    const treeview = wrapper.first('.v-tree-view-selector')
    expect(treeview.html()).toMatchSnapshot()
  })
  

})