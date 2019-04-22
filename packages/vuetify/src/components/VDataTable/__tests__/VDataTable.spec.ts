import VDataTable from '../VDataTable'
import {
  mount,
  Wrapper,
  MountOptions
} from '@vue/test-utils'
import { Breakpoint } from '../../../services/breakpoint'
import { Lang } from '../../../services/lang'
import ripple from '../../../directives/ripple/index'
import Vue from 'vue'

Vue.prototype.$vuetify = {
  rtl: false,
  lang: new Lang()
}
Vue.directive('ripple', ripple)

const testHeaders = [
  {
    text: 'Dessert (100g serving)',
    align: 'left',
    sortable: false,
    value: 'name'
  },
  { text: 'Calories', value: 'calories' },
  { text: 'Fat (g)', value: 'fat' },
  { text: 'Carbs (g)', value: 'carbs' },
  { text: 'Protein (g)', value: 'protein' },
  { text: 'Iron (%)', value: 'iron' }
]

const testItems = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%'
  }
]

describe('VDataTable.ts', () => {
  type Instance = InstanceType<typeof VDataTable>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')

    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDataTable, {
        mocks: {
          $vuetify: {
            breakpoint: new Breakpoint(),
            lang: new Lang(),
            theme: {
              dark: false
            }
          }
        },
        ...options
      })
    }
  })

  it('should render', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with data', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with body slot', () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5
      },
      scopedSlots: {
        body: props => vm.$createElement('div', [ JSON.stringify(props) ])
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render virtual table', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        virtualRows: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with showExpand', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        showExpand: true
      }
    })
    const expand = jest.spyOn(wrapper.vm, 'expand')

    expect(wrapper.html()).toMatchSnapshot()
    const expandIcon = wrapper.findAll('.v-data-table__expand-icon').at(0)
    expandIcon.trigger('click')
    expect(expand).toHaveBeenCalledWith({ calories: 159, carbs: 24, fat: 6, iron: '1%', name: 'Frozen Yogurt', protein: 4 }, true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with showSelect', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        showSelect: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with item.expanded scoped slot', () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5
      },
      scopedSlots: {
        'item.expanded': props => vm.$createElement('div', [ JSON.stringify(props) ])
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with group.summary scoped slot', () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5
      },
      scopedSlots: {
        'group.summary': props => vm.$createElement('div', [ JSON.stringify(props) ])
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with item scoped slot', () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5
      },
      scopedSlots: {
        'item': props => vm.$createElement('div', [ JSON.stringify(props) ])
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with grouped rows', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        groupBy: ['protein']
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with group scoped slot', () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        groupBy: ['protein']
      },
      scopedSlots: {
        group: props => vm.$createElement('div', [ JSON.stringify(props) ])
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render loading state', () => {
    const wrapper = mountFunction({
      propsData: {
        loading: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    const wrapper2 = mountFunction({
      propsData: {
        headers: testHeaders,
        loading: true
      },
      slots: {
        progress: '<div class="progress">50%</div>'
      }
    })

    expect(wrapper2.html()).toMatchSnapshot()
  })

  it('should calculate widths', () => {
    const wrapper = mountFunction({
      render: h => h('div', [
        h('th'),
        h('th'),
        h('th')
      ])
    })

    wrapper.vm.calcWidths()
    expect(wrapper.vm.widths).toEqual([ 0, 0, 0 ])
  })

  it('should filter headers', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name',
            filter: () => true
          },
          {
            text: 'Calories',
            value: 'calories',
            filter: () => false
          },
          {
            text: 'Fat (g)',
            value: 'fat',
            filter: () => true
          },
          {
            text: 'Carbs (g)',
            value: 'carbs',
            filter: () => false
          },
          {
            text: 'Protein (g)',
            value: 'protein',
            filter: () => false
          },
          {
            text: 'Iron (%)',
            value: 'iron',
            filter: () => true
          }
        ],
        items: testItems
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
