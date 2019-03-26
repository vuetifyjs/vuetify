import { test } from '@/test'
import Times from '@/components/VCalendar/mixins/times'

const Mock = {
  mixins: [Times],
  render: h => h('div')
}

test('times.ts', ({ mount }) => {
  it('should parse timestamp', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        now: '2019-02-08'
      }
    })

    expect(wrapper.vm.parsedNow).toBeDefined()
    expect(wrapper.vm.parsedNow).toMatchSnapshot()
  })

  it('should update day', async () => {
    const wrapper = mount(Mock)

    expect(typeof wrapper.vm.updateDay).toBe('function')
    const target = {}
    const now = {
      date: '2019-02-08',
      year: '2019',
      month: '2',
      day: '8',
      weekday: '4'
    }
    wrapper.vm.updateDay(now, target)
    expect(target).toEqual(now)
  })

  it('should not update day if dates are equal', async () => {
    const wrapper = mount(Mock)

    expect(typeof wrapper.vm.updateDay).toBe('function')
    const target = { date: '2019-02-08' }
    const now = {
      date: '2019-02-08',
      year: '2019',
      month: '2',
      day: '8',
      weekday: '4'
    }
    wrapper.vm.updateDay(now, target)
    expect(target).not.toEqual(now)
  })

  it('should not update time if times are equal', async () => {
    const wrapper = mount(Mock)

    expect(typeof wrapper.vm.updateTime).toBe('function')
    const target = { time: '08:30' }
    const now = {
      time: '08:30',
      hour: '8',
      minute: '30'
    }
    wrapper.vm.updateTime(now, target)
    expect(target).not.toEqual(now)
  })
})
