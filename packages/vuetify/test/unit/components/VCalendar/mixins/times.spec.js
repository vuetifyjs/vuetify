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
        now: "2019-02-08"
      }
    })

    expect(wrapper.vm.parsedNow).toBeDefined();
    expect(wrapper.vm.parsedNow).toMatchSnapshot();
  })
})
