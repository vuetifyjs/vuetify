import { computed } from 'vue'

// Types
import type { Prop } from 'vue'
import type { IRounded } from './rounded'

// Utils
import { roundedClassNames, isRounded } from './rounded'
import propsFactory from '@/util/propsFactory'

export interface BorderRadiusProps {
  rounded?: IRounded
}

export const makeBorderRadiusProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    validator: isRounded,
  } as Prop<IRounded>,
})

// Effect
export function useBorderRadius (props: BorderRadiusProps) {
  const borderRadiusClasses = computed(() => {
    return roundedClassNames(props)
  })

  return { borderRadiusClasses }
}
