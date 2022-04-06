import { VApp, VLocaleProvider } from '@/components'

export const Application = (_, { slots, attrs }) => {
  return (
    <VApp { ...attrs }>
      <VLocaleProvider rtl={attrs.rtl}>
        { slots.default() }
      </VLocaleProvider>
    </VApp>
  )
}
