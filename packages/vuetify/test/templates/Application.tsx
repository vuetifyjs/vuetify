import { VApp } from '@/components/VApp'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import type { FunctionalComponent } from 'vue'

export const Application: FunctionalComponent<{ rtl?: boolean }> = (props, { slots, attrs }) => {
  return (
    <VApp { ...attrs } rtl={ props.rtl }>
      <VLocaleProvider rtl={ props.rtl }>
        { slots.default?.() }
      </VLocaleProvider>
    </VApp>
  )
}
