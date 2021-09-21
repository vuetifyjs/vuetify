import VListGroup from './VListGroup'
import VListItem from './VListItem'

import type { SetupContext } from 'vue'
import type { VListGroupHeaderSlotProps } from './VListGroup'

export type ListItem = {
  children?: ListItem[]
}

export function renderItems (props: { items?: ListItem[] }, slots: SetupContext['slots']) {
  return slots.default?.() ?? props.items?.map(({ children, ...item }) => children ? (
    <VListGroup
      items={children}
      v-slots={{
        header: (headerProps: VListGroupHeaderSlotProps) => <VListItem {...item} {...headerProps} />,
      }}
    />
  ) : (
    <VListItem {...item} />
  ))
}
