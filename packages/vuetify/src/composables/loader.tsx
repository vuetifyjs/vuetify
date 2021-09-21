// Components
import { VProgressLinear } from '@/components/VProgressLinear'

// Utilities
import { computed } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { Slot } from 'vue'

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

// Generators
export function genLoader (
  active: boolean,
  name: string,
  color?: string,
  slot?: Slot,
) {
  return (
    <div class={`${name}__loader`}>
      { slot?.({
        color,
        isActive: active,
      }) }

      { !slot && (
        <VProgressLinear
          active={ active }
          color={ color }
          height="2"
          indeterminate
        />
      ) }
    </div>
  )
}
