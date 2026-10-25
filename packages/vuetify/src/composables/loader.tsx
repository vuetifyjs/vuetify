// Components
import { VProgressLinear } from '@/components/VProgressLinear'

// Utilities
import { toRef } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
import type { ExtractPropTypes, SetupContext } from 'vue'
import type { SlotsToProps } from '@/util'

export interface LoaderSlotProps {
  color: string | undefined
  isActive: boolean
  ariaLabel?: string
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
  const loaderClasses = toRef(() => ({
    [`${name}--loading`]: props.loading,
  }))

  return { loaderClasses }
}

export function LoaderSlot (
  props: {
    absolute?: boolean
    active: boolean
    ariaLabel?: string
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
        ariaLabel: props.ariaLabel,
      } satisfies LoaderSlotProps) || (
        <VProgressLinear
          absolute={ props.absolute }
          active={ props.active }
          color={ props.color }
          aria-label={ props.ariaLabel }
          height="2"
          indeterminate
        />
      )}
    </div>
  )
}
