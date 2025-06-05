// Utilities
import { onBeforeUnmount, shallowRef, toValue, watchEffect } from 'vue'
import { getCurrentInstance } from '@/util/getCurrentInstance'

// Types
import type { MaybeRef } from '@/util'

interface HotkeyOptions {
  event?: 'keydown' | 'keyup'
  inputs?: boolean
  sequenceTimeout?: number
}

export function useHotkey (
  keys: MaybeRef<string | undefined>,
  callback: (e: KeyboardEvent) => void,
  options: HotkeyOptions = {
    event: 'keydown',
    inputs: false,
    sequenceTimeout: 1000,
  }
) {
  const vm = getCurrentInstance('useHotkey')
  const isMac = typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)
  const timer = shallowRef<ReturnType<typeof setTimeout>>()
  const keyGroups = shallowRef<string[]>([])
  const isSequence = shallowRef(false)
  const groupIndex = shallowRef(0)

  const handler = (e: KeyboardEvent) => {
    const currentGroup = keyGroups.value[groupIndex.value]
    if (!currentGroup) return

    if (!options.inputs) {
      const activeElement = document.activeElement as HTMLElement
      if (activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
      )) return
    }

    if (matchesKeyGroup(e, currentGroup)) {
      e.preventDefault()

      if (isSequence.value) {
        if (timer.value) window.clearTimeout(timer.value)
        groupIndex.value++

        if (groupIndex.value === keyGroups.value.length) {
          callback(e)
          groupIndex.value = 0
        } else {
          timer.value = setTimeout(() => {
            groupIndex.value = 0
          }, options.sequenceTimeout)
        }
      } else {
        callback(e)
      }
    } else if (isSequence.value) {
      groupIndex.value = 0
      if (timer.value) window.clearTimeout(timer.value)
    }
  }

  const cleanup = () => {
    window.removeEventListener(options.event ?? 'keydown', handler)
    if (timer.value) window.clearTimeout(timer.value)
  }

  watchEffect(() => {
    const unrefKeys = toValue(keys)
    if (unrefKeys) {
      isSequence.value = unrefKeys.includes('-')
      keyGroups.value = isSequence.value ? unrefKeys.toLowerCase().split('-') : [unrefKeys.toLowerCase()]
      window.addEventListener(options.event ?? 'keydown', handler)
    } else {
      cleanup()
    }
  })

  if (vm) {
    onBeforeUnmount(cleanup)
  }

  function parseKeyGroup (group: string) {
    const parts = group.split(/[+_]/)
    const modifiers = {
      ctrl: parts.includes('ctrl'),
      shift: parts.includes('shift'),
      alt: parts.includes('alt'),
      meta: parts.includes('meta'),
      cmd: parts.includes('cmd'),
    }
    const actualKey = parts.find(part => !['ctrl', 'shift', 'alt', 'meta', 'cmd'].includes(part))
    return { modifiers, actualKey }
  }

  function matchesKeyGroup (e: KeyboardEvent, group: string) {
    const { modifiers, actualKey } = parseKeyGroup(group)
    let expectedCtrl = modifiers.ctrl
    let expectedMeta = modifiers.meta
    if (isMac && (modifiers.cmd || (modifiers.ctrl && !modifiers.meta))) {
      expectedCtrl = false
      expectedMeta = true
    }
    return (
      expectedCtrl === e.ctrlKey &&
      modifiers.shift === e.shiftKey &&
      modifiers.alt === e.altKey &&
      expectedMeta === e.metaKey &&
      actualKey === e.key.toLowerCase()
    )
  }

  return cleanup
}
