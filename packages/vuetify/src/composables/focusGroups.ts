// Utilities
import { toValue } from 'vue'
import { focusableChildren } from '@/util'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { VList } from '@/components/VList'

type FocusGroup =
  | { type: 'list', contentRef: Ref<VList | undefined>, displayItemsCount: MaybeRefOrGetter<number> }
  | { type: 'element', contentRef: Ref<HTMLElement | undefined> }

export function useFocusGroups ({ groups, onLeave }: {
  groups: FocusGroup[]
  onLeave: () => void
}) {
  function getContentRef (group: FocusGroup): HTMLElement | undefined {
    return group.type === 'list'
      ? group.contentRef.value?.$el as HTMLElement | undefined
      : group.contentRef.value
  }

  function getChildren (group: FocusGroup): HTMLElement[] {
    const contentRef = getContentRef(group)
    return contentRef ? focusableChildren(contentRef) : []
  }

  function onTabKeydown (e: KeyboardEvent) {
    const target = e.target as Element
    const direction = e.shiftKey ? 'backward' : 'forward'
    const children = groups.map(getChildren)

    const currentGroupIndex = groups
      .map(g => g.type === 'list' ? g.contentRef.value?.$el as HTMLElement : g.contentRef.value)
      .findIndex(el => el?.contains(target))

    const nextIndex = nextFocusGroup(children, currentGroupIndex, direction, target)

    if (nextIndex === null) {
      const originGroup = groups[currentGroupIndex]
      const origin = children[currentGroupIndex]
      const isListGroup = originGroup.type === 'list'

      const atEdge = isListGroup || (
        direction === 'forward'
          ? origin.at(-1) === e.target
          : origin.at(0) === e.target
      )

      if (atEdge) {
        onLeave()
      }
    } else {
      e.preventDefault()
      e.stopImmediatePropagation()

      const nextGroup = groups[nextIndex]
      if (nextGroup.type === 'list' && toValue(nextGroup.displayItemsCount) > 0) {
        nextGroup.contentRef.value?.focus(0)
      } else {
        const fromBefore = direction === 'forward'
        children[nextIndex].at(fromBefore ? 0 : -1)!.focus()
      }
    }
  }

  function nextFocusGroup (
    children: HTMLElement[][],
    currentIndex: number,
    direction: 'forward' | 'backward',
    target: Element
  ): number | null {
    const originGroup = groups[currentIndex]
    const origin = children[currentIndex]

    // List groups always allow leaving (VList manages internal focus)
    // Element groups require being at the edge focusable child
    if (originGroup.type !== 'list') {
      const isAtEdge = direction === 'forward'
        ? origin.at(-1) === target
        : origin.at(0) === target

      if (!isAtEdge) return null
    }

    const step = direction === 'forward' ? 1 : -1
    for (let i = currentIndex + step; i >= 0 && i < groups.length; i += step) {
      const group = groups[i]
      if (children[i].length > 0 || (group.type === 'list' && toValue(group.displayItemsCount) > 0)) {
        return i
      }
    }

    return null
  }

  return { onTabKeydown }
}
