// Utilities
import { computed, Fragment, inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, VNode } from 'vue'
import { VOtpInputSymbol } from './VOtpInput'

function countSlotChildren (vnodes: VNode[]): number {
  let count = 0
  for (const vnode of vnodes) {
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      count += countSlotChildren(vnode.children as VNode[])
    } else {
      count++
    }
  }
  return count
}

export const makeVOtpGroupProps = propsFactory({
  merged: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
}, 'VOtpGroup')

export const VOtpGroup = genericComponent()({
  name: 'VOtpGroup',

  props: makeVOtpGroupProps(),

  setup (props, { slots }) {
    const otpInput = inject(VOtpInputSymbol)

    const isMerged = computed(() => props.merged ?? otpInput?.merged.value ?? false)

    useRender(() => {
      const children = slots.default?.() ?? []

      return (
        <div
          class={[
            'v-otp-group',
            {
              'v-otp-group--merged': isMerged.value,
            },
          ]}
          style={ isMerged.value ? { flex: countSlotChildren(children) } : undefined }
        >
          { children }
        </div>
      )
    })
  },
})

export type VOtpGroup = InstanceType<typeof VOtpGroup>
