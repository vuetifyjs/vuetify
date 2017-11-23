import Vue from 'vue'
import { compileToFunctions } from 'vue-template-compiler'
import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VDatePicker from '~components/VDatePicker'

test('VDatePicker.js', ({ mount }) => {
  it('should emit input event on year click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month'
      },
      data: {
        activePicker: 'YEAR'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
    expect(cb).toBeCalledWith('2012-05')
  })

  it('should not emit input event on year click if month is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: []
      },
      data: {
        activePicker: 'YEAR'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
    expect(cb).not.toBeCalled()
  })

  it('should emit input event on month click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__table tbody tr:first-child td:first-child button')[0].trigger('click')
    expect(cb).toBeCalledWith('2013-01')
  })

  it('should be scrollable', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        scrollable: true
      }
    })

    wrapper.find('.picker--date__table')[0].trigger('wheel')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with pick-month prop', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        type: 'month'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates and pick-month prop', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: ['2013-01', '2013-03', '2013-05', '2013-07', '2013-09']
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with month formatting functions', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        type: 'month',
        monthFormat: date => `(${date.split('-')[1]})`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
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
        type: 'month',
        value: '2005-11-01',
        color: 'orange darken-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match change month when clicked on header arrow buttons', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11',
        type: 'month'
      }
    })

    const [leftButton, rightButton] = wrapper.find('.picker--date__header-selector button')

    leftButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2004')

    rightButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2006')
  })

  it('should match change active picker when clicked on month button', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        type: 'month'
      }
    })

    const button = wrapper.find('.picker--date__header-selector-date strong')[0]

    button.trigger('click')
    expect(wrapper.vm.activePicker).toBe('YEAR')
  })

  it('should select year', async () => {
    const wrapper = mount(VDatePicker, {
      data: {
        activePicker: 'YEAR'
      },
      propsData: {
        type: 'month',
        value: '2005-11'
      }
    })

    wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
    expect(wrapper.vm.tableDate).toBe('2004')
  })
})
