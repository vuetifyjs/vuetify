// Components
import { VProgressLinear } from '@/components/VProgressLinear'

// Utilities
import { toRef } from 'vue'
import { getCurrentInstanceName, propsFactory, renderSlot } from '@/util'

// Types
import type { ExtractPropTypes, SetupContext, SlotsType } from 'vue'
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
  const loaderClasses = toRef(() => ({
    [`${name}--loading`]: props.loading,
  }))

  return { loaderClasses }
}

export function LoaderSlot (
  props: {
    absolute?: boolean
    active: boolean
    name: string
    color?: string
  } & ExtractPropTypes<SlotsToProps<{
    default: LoaderSlotProps
  }>>,
  { slots }: SetupContext<{}, SlotsType<{ default: LoaderSlotProps }>>,
) {
  return (
    <div class={ `${props.name}__loader` }>
      { renderSlot(slots, 'default', {
        color: props.color,
        isActive: props.active,
      }, () => (
        <VProgressLinear
          absolute={ props.absolute }
          active={ props.active }
          color={ props.color }
          height="2"
          indeterminate
        />
      ))}
    </div>
  )
}
