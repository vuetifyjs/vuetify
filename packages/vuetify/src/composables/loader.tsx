// Components
import { VProgressLinear } from '@/components/VProgressLinear'

// Utilities
import { computed } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { SetupContext } from '@vue/runtime-core'

export interface LoaderProps {
  loading: boolean
}

// Composables
export const makeLoaderProps = propsFactory({
  loading: Boolean,
}, 'loader')

export function useLoader (props: LoaderProps, name: string) {
  const loaderClasses = computed(() => ({
    [`${name}--loading`]: props.loading,
  }))

  return { loaderClasses }
}

export function LoaderSlot (
  props: {
    active: boolean
    name: string
    color?: string
  },
  { slots }: SetupContext,
) {
  return (
    <div class={`${props.name}__loader`}>
      { slots.default?.({
        color: props.color,
        isActive: props.active,
      }) || (
        <VProgressLinear
          active={ props.active }
          color={ props.color }
          height="2"
          indeterminate
        />
      )}
    </div>
  )
}
