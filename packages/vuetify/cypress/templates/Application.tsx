import { VApp } from '@/components/VApp'
import { VLocaleProvider } from '@/components/VLocaleProvider'

export const Application = (_, { slots, attrs }) => {
  return (
    <VApp { ...attrs }>
      <VLocaleProvider rtl={attrs.rtl}>
        { slots.default() }
      </VLocaleProvider>
    </VApp>
  )
}
