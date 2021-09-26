import VListGroup from './VListGroup'
import VListItem from './VListItem'

import type { SetupContext } from 'vue'
import type { VListGroupHeaderSlotProps } from './VListGroup'

export type ListItem = {
  children?: ListItem[]
  value?: string
}

export function renderItems (props: { items?: ListItem[] }, slots: SetupContext['slots']) {
  return slots.default?.() ?? props.items?.map(({ children, ...item }) => {
    const { value, ...rest } = item
    return children ? (
      <VListGroup
        value={value}
        items={children}
        v-slots={{
          ...slots,
          header: (headerProps: VListGroupHeaderSlotProps) => slots.header
            ? slots.header({ ...rest, ...headerProps })
            : <VListItem {...rest} {...headerProps} />,
        }}
      />
    ) : (
      slots.item ? slots.item(item) : <VListItem {...item} v-slots={slots} />
    )
  })
}
