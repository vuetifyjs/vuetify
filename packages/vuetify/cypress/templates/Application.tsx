import { VApp } from '@/components/VApp'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import type { FunctionalComponent } from 'vue'

export const Application: FunctionalComponent<{ rtl?: boolean }> = (props, { slots, attrs }) => {
  return (
    <VApp { ...attrs } rtl={ props.rtl }>
      <VDefaultsProvider defaults={ {
        global: {
          class: 'v-global-class',
          style: {
            opacity: 0.5,
          },
        },
      } }
      >
        <VLocaleProvider rtl={ props.rtl }>
          { slots.default?.() }
        </VLocaleProvider>
      </VDefaultsProvider>
    </VApp>
  )
}
