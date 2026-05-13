// Utilities
import { isRef, toRef } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'
export interface ElevationProps {
  elevation?: number | string | null
}

// Composables
export const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    // no limit to allow both 0-6 (MD3) and legacy 0-24 (MD2)
    validator: (value: string | number) => parseInt(value) >= 0,
  },
}, 'elevation')

type ElevationData = {
  elevationClasses: Ref<string[]>
}

export function useElevation (props: ElevationProps | Ref<number | string | undefined>): ElevationData {
  const elevationClasses = toRef(() => {
    const elevation = isRef(props) ? props.value : props.elevation
    if (elevation == null) return []
    return [`elevation-${parseInt(elevation)}`]
  })

  return { elevationClasses }
}
