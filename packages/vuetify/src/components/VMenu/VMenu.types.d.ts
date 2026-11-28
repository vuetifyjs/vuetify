// Types
import type { Component, Ref, ShallowRef } from 'vue'
import type { OverlaySlots, TransitionValue, VOverlay, VOverlayBaseProps } from '@/components/VOverlay/VOverlay.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { DefaultKeysOf, VuetifyComponent } from '@/util/defineComponent.types'

export interface VMenuProps extends Omit<VOverlayBaseProps, 'absolute' | 'transition'> {
  _disableKeys?: boolean
  id?: string
  openOnArrow?: boolean
  submenu?: boolean
  transition?: TransitionValue | { component: Component }
}

type VMenuDefaultKeys =
  | Exclude<Extract<DefaultKeysOf<typeof VOverlay>, keyof VOverlayBaseProps>, 'absolute'>
  | 'disableInitialFocus'
  | 'closeDelay'
  | '_disableKeys'
  | 'location'
  | 'openDelay'
  | 'openOnArrow'
  | 'submenu'
  | 'transition'

export type VMenuExposed = ForwardRefs<{ id: Readonly<Ref<string, string>>, ΨopenChildren: ShallowRef<Map<string, () => void>, Map<string, () => void>> }, [VOverlay]>

export declare const VMenu: VuetifyComponent<
  VMenuProps,
  VMenuDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
    'click:outside': (e: MouseEvent) => true
    afterEnter: () => true
    afterLeave: () => true
  },
  OverlaySlots,
  VMenuExposed
>
export type VMenu = InstanceType<typeof VMenu>

export {}
