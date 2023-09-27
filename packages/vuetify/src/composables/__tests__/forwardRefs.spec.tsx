// Composables
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { useRender } from '@/util'

const VA = defineComponent({
  name: 'VA',
  setup () {
    useRender(() => (
      <div class="VA"></div>
    ))

    return {
      a: 1,
    }
  },
})
const VB = defineComponent({
  name: 'VB',

  setup () {
    const aRef = ref<InstanceType<typeof VA>>()

    useRender(() => (
      <div class="VB">
        <VA ref={ aRef } />
      </div>
    ))

    return forwardRefs({
      b: 2,
    }, aRef)
  },
})
const VC = defineComponent({
  name: 'VC',

  setup () {
    const bRef = ref<InstanceType<typeof VB>>()

    useRender(() => (
      <div class="VC">
        <VB ref={ bRef } />
      </div>
    ))

    return forwardRefs({
      c: 3,
    }, bRef)
  },
})
const VD = defineComponent({
  name: 'VD',

  setup () {
    const cRef = ref<InstanceType<typeof VC>>()

    useRender(() => (
      <div class="VD">
        <VC ref={ cRef } />
      </div>
    ))

    return forwardRefs({
      d: 4,
    }, cRef)
  },
})

describe('forwardRefs', () => {
  it('one level', () => {
    const wrapper = mount(VA)

    expect(wrapper.vm.a).toBe(1)
  })

  it('two levels', () => {
    const wrapper = mount(VB)

    expect(wrapper.vm.b).toBe(2)
    expect(wrapper.vm.a).toBe(1)
  })

  it('three levels', () => {
    const wrapper = mount(VC)

    expect(wrapper.vm.c).toBe(3)
    expect(wrapper.vm.b).toBe(2)
    expect(wrapper.vm.a).toBe(1)
  })

  it('four levels', () => {
    const wrapper = mount(VD)

    expect(wrapper.vm.d).toBe(4)
    expect(wrapper.vm.c).toBe(3)
    expect(wrapper.vm.b).toBe(2)
    expect(wrapper.vm.a).toBe(1)
  })
})
