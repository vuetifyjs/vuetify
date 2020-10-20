import VDataTable from '../VDataTable'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { Breakpoint } from '../../../services/breakpoint'
import ripple from '../../../directives/ripple/index'
import Vue from 'vue'
import { Lang } from '../../../services/lang'
import { preset } from '../../../presets/default'
import { resizeWindow } from '../../../../test'

Vue.prototype.$vuetify = {
  rtl: false,
  lang: new Lang(preset),
}
Vue.directive('ripple', ripple)

const testHeaders = [
  {
    text: 'Dessert (100g serving)',
    align: 'left',
    sortable: false,
    value: 'name',
  },
  { text: 'Calories', value: 'calories' },
  { text: 'Fat (g)', value: 'fat' },
  { text: 'Carbs (g)', value: 'carbs' },
  { text: 'Protein (g)', value: 'protein' },
  { text: 'Iron (%)', value: 'iron' },
]

const testItems = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
    class: 'test',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
    class: ['test', 'second'],
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
    class: { test: true, second: false },
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
  },
]

/* eslint-disable max-statements */
describe('VDataTable.ts', () => {
  type Instance = InstanceType<typeof VDataTable>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')

    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDataTable, {
        mocks: {
          $vuetify: {
            breakpoint: new Breakpoint(preset),
            lang: new Lang(preset),
            theme: {
              dark: false,
            },
          },
        },
        sync: false,
        ...options,
      })
    }

    return resizeWindow(0)
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
        itemsPerPage: 5,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with body slot', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
      },
      scopedSlots: {
        body (props) {
          return this.$createElement('div', [props.items.length])
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should render virtual table', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        virtualRows: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with showExpand', async () => {
    const expand = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        itemKey: 'name',
        items: testItems,
        itemsPerPage: 5,
        showExpand: true,
      },
      listeners: {
        'update:expanded': expand,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    const expandIcon = wrapper.findAll('.v-data-table__expand-icon').at(0)
    expandIcon.trigger('click')

    await wrapper.vm.$nextTick()
    expect(expand).toHaveBeenCalledWith(testItems.slice(0, 1))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with showSelect', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        showSelect: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with item.expanded scoped slot', async () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        expanded: testItems,
      },
      scopedSlots: {
        'expanded-item': props => vm.$createElement('div', ['expanded']),
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with group.summary scoped slot', () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        groupBy: 'calories',
      },
      scopedSlots: {
        'group.summary': props => vm.$createElement('div', ['summary']),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with item scoped slot', () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
      },
      scopedSlots: {
        item: props => vm.$createElement('div', [JSON.stringify(props)]),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with grouped rows', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        groupBy: ['protein'],
      },
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
        groupBy: ['protein'],
      },
      scopedSlots: {
        group: props => vm.$createElement('div', [JSON.stringify(props)]),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render loading state', () => {
    const wrapper = mountFunction({
      propsData: {
        loading: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const wrapper2 = mountFunction({
      propsData: {
        headers: testHeaders,
        loading: true,
      },
      slots: {
        progress: '<div class="progress">50%</div>',
      },
    })

    expect(wrapper2.html()).toMatchSnapshot()
  })

  it.each([
    'click',
    'contextmenu',
    'dblclick',
  ])('should emit event when %sing on internally created row', async event => {
    const eventToEmit = event + ':row'
    const fn = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
      },
      listeners: {
        [eventToEmit]: fn,
      },
    })

    wrapper.find('tbody tr').trigger(event)
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8254
  it('should pass kebab-case footer props correctly', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: [],
        items: [],
        footerProps: {
          'items-per-page-text': 'Foo:',
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8266
  it('should use options prop for initial values', () => {
    const fn = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        options: {
          page: 2,
          itemsPerPage: 5,
        },
      },
      listeners: {
        'update:options': fn,
      },
    })

    expect(fn).toHaveBeenCalledWith(expect.objectContaining({
      page: 2,
    }))
  })

  it('should render footer.page-text slot content', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: [],
        items: [{}],
      },
      scopedSlots: {
        'footer.page-text' ({ pageStart, pageStop }) {
          return this.$createElement('div', [`foo ${pageStart} bar ${pageStop}`])
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8359
  it('should not limit page to current item count when using server-items-length', async () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: [],
        page: 2,
        itemsPerPage: 5,
        serverItemsLength: 0,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      items: testItems.slice(5),
      serverItemsLength: 20,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not search column with filterable set to false', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: testItems,
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            filterable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      search: 'cup',
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not search column with filterable set to false and has filter function', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: testItems,
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            value: 'name',
          },
          { text: 'Calories', value: 'calories', filter: v => v > 400 },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          value: 'name',
        },
        { text: 'Calories', value: 'calories', filter: v => v > 400, filterable: false },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8359
  it('should limit page to current page count if not using server-items-length', async () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        page: 3,
        itemsPerPage: 5,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8184
  it('should default to first option in itemsPerPageOptions if it does not include itemsPerPage', async () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        footerProps: {
          itemsPerPageOptions: [6, 7],
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8817
  it('should handle object when checking if it should default to first option in itemsPerPageOptions', async () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: -1,
        footerProps: {
          itemsPerPageOptions: [6, { text: 'All', value: -1 }],
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/9599
  it('should not immediately emit items-per-page', async () => {
    const itemsPerPage = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        footerProps: {
          itemsPerPageOptions: [6, 7],
        },
      },
      listeners: {
        'update:itemsPerPage': itemsPerPage,
      },
    })

    expect(itemsPerPage).not.toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/9010
  it('should change page if item count decreases below page start', async () => {
    const page = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems.slice(0, 4),
        itemsPerPage: 2,
        footerProps: {
          itemsPerPageOptions: [2],
        },
        page: 2,
      },
      listeners: {
        'update:page': page,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ items: testItems.slice(0, 2) })
    await wrapper.vm.$nextTick()

    expect(page).toHaveBeenCalledWith(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/8477
  it('should emit two item-selected events when using single-select prop and selecting new item', async () => {
    const itemSelected = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        itemKey: 'name',
        items: testItems.slice(0, 2),
        value: [testItems[0]],
        showSelect: true,
        singleSelect: true,
      },
      listeners: {
        'item-selected': itemSelected,
      },
    })

    const checkbox = wrapper.findAll('.v-data-table__checkbox').at(1)
    checkbox.trigger('click')
    await wrapper.vm.$nextTick()

    expect(itemSelected).toHaveBeenCalledTimes(2)
    expect(itemSelected).toHaveBeenCalledWith({ item: testItems[0], value: false })
    expect(itemSelected).toHaveBeenCalledWith({ item: testItems[1], value: true })
  })

  // https://github.com/vuetifyjs/vuetify/issues/8915
  it('should not select item that is not selectable', async () => {
    const items = [
      { ...testItems[0], isSelectable: false },
      { ...testItems[1] },
    ]
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items,
        showSelect: true,
      },
      listeners: {
        input,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const selectAll = wrapper.findAll('.v-simple-checkbox').at(0)
    selectAll.trigger('click')
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenNthCalledWith(1, [testItems[1]])

    const single = wrapper.findAll('.v-simple-checkbox').at(1)
    single.trigger('click')
    await wrapper.vm.$nextTick()

    expect(input.mock.calls).toHaveLength(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/8915
  it('should toggle all selectable items', async () => {
    const items = [
      { ...testItems[0], isSelectable: false },
      { ...testItems[1] },
    ]
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items,
        showSelect: true,
      },
      listeners: {
        input,
      },
    })

    const selectAll = wrapper.findAll('.v-simple-checkbox').at(0)
    selectAll.trigger('click')
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenNthCalledWith(1, [testItems[1]])

    selectAll.trigger('click')
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenNthCalledWith(2, [])
  })

  // https://github.com/vuetifyjs/vuetify/issues/10392
  it('should search group-by column', async () => {
    const headers = [
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'ID',
        value: 'id',
      },
    ]

    const items = [
      {
        name: 'Assistance',
        id: 1,
      },
      {
        name: 'Candidat',
        id: 2,
      },
    ]

    const wrapper = mountFunction({
      propsData: {
        headers,
        items,
        itemKey: 'id',
        groupBy: 'name',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ search: 'candidat' })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/10289
  it('should render item slot when using group-by function', async () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        itemKey: 'name',
        items: testItems.slice(0, 2),
        groupBy: 'name',
      },
      scopedSlots: {
        item () {
          return this.$createElement('div', ['scoped'])
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/10392
  it('should emit pagination event when filtering', async () => {
    const headers = [
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'ID',
        value: 'id',
      },
    ]

    const items = [
      {
        name: 'Assistance',
        id: 1,
      },
      {
        name: 'Candidat',
        id: 2,
      },
    ]

    const pagination = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        headers,
        items,
        itemKey: 'id',
      },
      listeners: {
        pagination,
      },
    })

    expect(pagination).toHaveBeenLastCalledWith({
      itemsLength: 2,
      itemsPerPage: 10,
      page: 1,
      pageCount: 1,
      pageStart: 0,
      pageStop: 2,
    })

    wrapper.setProps({ search: 'candidat' })
    await wrapper.vm.$nextTick()

    expect(pagination).toHaveBeenLastCalledWith({
      itemsLength: 1,
      itemsPerPage: 10,
      page: 1,
      pageCount: 1,
      pageStart: 0,
      pageStop: 1,
    })

    expect(pagination).toHaveBeenCalledTimes(2)
  })

  // https://github.com/vuetifyjs/vuetify/issues/10715
  // NOTE: This test currently succeeds regardless of fix
  // It seems like the test environment does not double
  // fire the events in the same way the browser does
  it('should not emit too many pagination events', async () => {
    const headers = [
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'ID',
        value: 'id',
      },
    ]

    const items = [
      {
        name: 'Assistance',
        id: 1,
      },
      {
        name: 'Candidat',
        id: 2,
      },
    ]

    const wrapper = mountFunction({
      propsData: {
        headers,
        itemKey: 'id',
        serverItemsLength: 0,
      },
    })

    wrapper.setProps({ items, serverItemsLength: items.length })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().pagination).toHaveLength(2)
  })

  // https://github.com/vuetifyjs/vuetify/issues/4975
  it('should show correct aria-labels when sorting', async () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        itemKey: 'name',
        items: testItems.slice(0, 5),
        sortBy: 'calories',
      },
    })

    wrapper.setProps({ sortDesc: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ mustSort: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply class list to rows', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        itemClass: () => ['my-class', 'my-other-class'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply class unique to rows', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        itemClass: () => 'my-unique-class',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply class function to rows', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        itemClass: (item: Object) => ({
          'first-class': item.fat < 10,
          'second-class': item.protein > 4.0,
        }),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply class from item to rows', () => {
    const wrapper = mountFunction({
      propsData: {
        headers: testHeaders,
        items: testItems,
        itemsPerPage: 5,
        itemClass: 'class',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/11179
  it('should return rows from columns that exclusively match custom filters', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: testItems,
        headers: [
          { text: 'Dessert (100g serving)', align: 'left', value: 'name' },
          { text: 'Calories', value: 'calories', filter: value => value === 159 },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
      },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalCurrentItems).toHaveLength(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/10244
  it('should respect mustSort property on options', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: testItems,
        headers: [
          { text: 'Dessert (100g serving)', value: 'name' },
        ],
        options: {
          mustSort: true,
        },
      },
    })

    wrapper.find('th').trigger('click')
    await wrapper.vm.$nextTick()

    wrapper.find('th').trigger('click')
    await wrapper.vm.$nextTick()

    wrapper.find('th').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should hide group button when column is not groupable', async () => {
    const wrapper = mountFunction({
      propsData: {
        showGroupBy: true,
        items: testItems,
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            value: 'name',
            groupable: false,
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should return rows matching search term if specified', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: testItems,
        headers: [
          { text: 'Dessert (100g serving)', align: 'left', value: 'name' },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
      },
    })

    wrapper.setProps({ search: 'unknown-term' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalCurrentItems).toHaveLength(0)

    wrapper.setProps({ search: 'Eclair' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalCurrentItems).toHaveLength(1)
  })

  it('should return results which match both search term and column filters if both specified', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: testItems,
        headers: [
          { text: 'Dessert (100g serving)', align: 'left', value: 'name' },
          { text: 'Calories', value: 'calories', filter: value => value < 300 },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
      },
    })

    wrapper.setProps({ search: 'EA' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalCurrentItems).toHaveLength(1)
  })
})
