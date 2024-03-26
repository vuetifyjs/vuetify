// Components
import { makeVWindowItemProps, VWindowItem } from '@/components/VWindow/VWindowItem'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps(),
}, 'VTabsWindowItem')

export const VTabsWindowItem = genericComponent()({
  name: 'VTabsWindowItem',

  props: makeVTabsWindowItemProps(),

  setup (props, { slots }) {
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props)

      return (
        <VWindowItem
          _as="VTabsWindowItem"
          { ...windowItemProps }
          class="v-tabs-window-item"
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VTabsWindowItem = InstanceType<typeof VTabsWindowItem>
