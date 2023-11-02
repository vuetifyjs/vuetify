// Components
import { VProgressLinear } from '@/components/VProgressLinear'

// Utilities
import { computed } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
import type { ExtractPropTypes, SetupContext } from 'vue'
import type { SlotsToProps } from '@/util'

export interface LoaderSlotProps {
  color: string | undefined
  isActive: boolean
}

export interface LoaderProps {
  loading?: boolean | string
}

// Composables
export const makeLoaderProps = propsFactory({
  loading: [Boolean, String],
}, 'loader')

export function useLoader (
  props: LoaderProps,
  name = getCurrentInstanceName(),
) {
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
  } & ExtractPropTypes<SlotsToProps<{
    default: LoaderSlotProps
  }>>,
  { slots }: SetupContext,
) {
  return (
    <div class={ `${props.name}__loader` }>
      { slots.default?.({
        color: props.color,
        isActive: props.active,
      } as LoaderSlotProps) || (
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
