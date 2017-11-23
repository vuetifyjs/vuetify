import Vue from 'vue'
import { compileToFunctions } from 'vue-template-compiler'
import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VDatePicker from '~components/VDatePicker'

test('VDatePicker.js', ({ mount }) => {
  it('should display the correct date in title and header', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
      }
    })

    const title = wrapper.find('.picker--date__title-date div')[0]
    const header = wrapper.find('.picker--date__header-selector-date strong')[0]

    expect(title.text()).toBe('Tue, Nov 1')
    expect(header.text()).toBe('November 2005')
  })

  it('should match snapshot with default settings', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event on date click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__table tbody tr+tr td:first-child button')[0].trigger('click')
    expect(cb).toBeCalledWith('2013-05-05')
  })

  it('should emit input event on month click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-13'
      },
      data: {
        activePicker: 'MONTH'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__table tbody tr:first-child td:first-child button')[0].trigger('click')
    expect(cb).toBeCalledWith('2013-01-13')
  })

  it('should not emit input event on month click if date is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-13',
        allowedDates: []
      },
      data: {
        activePicker: 'MONTH'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__table tbody tr:first-child td:first-child button')[0].trigger('click')
    expect(cb).not.toBeCalled()
  })

  it('should emit input event on year click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-13'
      },
      data: {
        activePicker: 'YEAR'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
    expect(cb).toBeCalledWith('2012-05-13')
  })

  // Uncomment after merging #2612
  // it('should not emit input event on year click if date is not allowed', async () => {
  //   const cb = jest.fn()
  //   const wrapper = mount(VDatePicker, {
  //     propsData: {
  //       value: '2013-05-13',
  //       allowedDates: []
  //     },
  //     data: {
  //       activePicker: 'YEAR'
  //     }
  //   })

  //   wrapper.vm.$on('input', cb);
  //   wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
  //   expect(cb).not.toBeCalled()
  // })

  it('should be scrollable', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        scrollable: true
      }
    })

    wrapper.find('.picker--date__table')[0].trigger('wheel')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with dark theme', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        dark: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        allowedDates: { min: '2013-05-03', max: '2013-05-19' }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with no title', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        noTitle: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with first day of week', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        firstDayOfWeek: 2
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: This fails in different ways for multiple people
  // Avoriaz/Jsdom (?) doesn't fully support date formatting using locale
  // This should be tested in browser env
  it.skip('should match snapshot with locale', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        locale: 'fa-AF'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with title/header formatting functions', () => {
    const dateFormat = date => `(${date})`
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        headerDateFormat: dateFormat,
        titleDateFormat: dateFormat
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        color: 'orange darken-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with year icon', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        yearIcon: 'year'
      }
    })

    expect(wrapper.find('.picker__title')[0].html()).toMatchSnapshot()
  })

  it('should match change month when clicked on header arrow buttons', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01'
      }
    })

    const [leftButton, rightButton] = wrapper.find('.picker--date__header-selector button')

    leftButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2005-10')

    rightButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2005-12')
  })

  it('should match change active picker when clicked on month button', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01'
      }
    })

    const button = wrapper.find('.picker--date__header-selector-date strong')[0]

    button.trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
  })

  it('should match snapshot with slot', async () => {
    const vm = new Vue()
    const slot = props => vm.$createElement('div', { class: 'scoped-slot' })
    const component = Vue.component('test', {
      components: {
        VDatePicker
      },
      render (h) {
        return h('v-date-picker', {
          props: {
            type: 'date',
            value: '2005-11-01'
          },
          scopedSlots: {
            default: slot
          }
        })
      }
    })

    const wrapper = mount(component)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match years snapshot', async () => {
    const wrapper = mount(VDatePicker, {
      data: {
        activePicker: 'YEAR'
      },
      propsData: {
        type: 'date',
        value: '2005-11-01'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.find('.picker--date__title-year')[0].trigger('click')
    expect(wrapper.vm.activePicker).toBe('YEAR')

    await wrapper.vm.$nextTick()

    wrapper.find('.picker--date__title-date')[0].trigger('click')
    expect(wrapper.vm.activePicker).toBe('DATE')
  })

  it('should select year', async () => {
    const wrapper = mount(VDatePicker, {
      data: {
        activePicker: 'YEAR'
      },
      propsData: {
        type: 'date',
        value: '2005-11-01'
      }
    })

    wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
    expect(wrapper.vm.tableDate).toBe('2004-11')
  })

  it('should correctly update table month', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-13'
      }
    })

    wrapper.vm.updateTableMonth(-1)
    expect(wrapper.vm.tableDate).toBe('2004-12')
    wrapper.vm.updateTableMonth(1)
    expect(wrapper.vm.tableDate).toBe('2004-2')
    wrapper.vm.updateTableMonth(12)
    expect(wrapper.vm.tableDate).toBe('2005-01')
  })
})
