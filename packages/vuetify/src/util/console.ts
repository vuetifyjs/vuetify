/* eslint-disable no-console */
import Vuetify from '../framework'

function createMessage (message: string, vm?: any, parent?: any): string | void {
  if (Vuetify.config.silent) return

  if (parent) {
    vm = {
      _isVue: true,
      $parent: parent,
      $options: vm,
    }
  }

  if (vm) {
    // Only show each message once per instance
    vm.$_alreadyWarned = vm.$_alreadyWarned || []
    if (vm.$_alreadyWarned.includes(message)) return
    vm.$_alreadyWarned.push(message)
  }

  return `[Vuetify] ${message}` + (
    vm ? generateComponentTrace(vm) : ''
  )
}

export function consoleInfo (message: string, vm?: any, parent?: any): void {
  const newMessage = createMessage(message, vm, parent)
  newMessage != null && console.info(newMessage)
}

export function consoleWarn (message: string, vm?: any, parent?: any): void {
  const newMessage = createMessage(message, vm, parent)
  newMessage != null && console.warn(newMessage)
}

export function consoleError (message: string, vm?: any, parent?: any): void {
  const newMessage = createMessage(message, vm, parent)
  newMessage != null && console.error(newMessage)
}

export function deprecate (original: string, replacement: string, vm?: any, parent?: any) {
  consoleWarn(`[UPGRADE] '${original}' is deprecated, use '${replacement}' instead.`, vm, parent)
}
export function breaking (original: string, replacement: string, vm?: any, parent?: any) {
  consoleError(`[BREAKING] '${original}' has been removed, use '${replacement}' instead. For more information, see the upgrade guide https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0#user-content-upgrade-guide`, vm, parent)
}
export function removed (original: string, vm?: any, parent?: any) {
  consoleWarn(`[REMOVED] '${original}' has been removed. You can safely omit it.`, vm, parent)
}

/**
 * Shamelessly stolen from vuejs/vue/blob/dev/src/core/util/debug.js
 */

const classifyRE = /(?:^|[-_])(\w)/g
const classify = (str: string) => str
  .replace(classifyRE, c => c.toUpperCase())
  .replace(/[-_]/g, '')

function formatComponentName (vm: any, includeFile?: boolean): string {
  if (vm.$root === vm) {
    return '<Root>'
  }
  const options = typeof vm === 'function' && vm.cid != null
    ? vm.options
    : vm._isVue
      ? vm.$options || vm.constructor.options
      : vm || {}
  let name = options.name || options._componentTag
  const file = options.__file
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/)
    name = match && match[1]
  }

  return (
    (name ? `<${classify(name)}>` : `<Anonymous>`) +
    (file && includeFile !== false ? ` at ${file}` : '')
  )
}

function generateComponentTrace (vm: any): string {
  if (vm._isVue && vm.$parent) {
    const tree: any[] = []
    let currentRecursiveSequence = 0
    while (vm) {
      if (tree.length > 0) {
        const last: any = tree[tree.length - 1]
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++
          vm = vm.$parent
          continue
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence]
          currentRecursiveSequence = 0
        }
      }
      tree.push(vm)
      vm = vm.$parent
    }
    return '\n\nfound in\n\n' + tree
      .map((vm, i) => `${
        i === 0 ? '---> ' : ' '.repeat(5 + i * 2)
      }${
        Array.isArray(vm)
          ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
          : formatComponentName(vm)
      }`)
      .join('\n')
  } else {
    return `\n\n(found in ${formatComponentName(vm)})`
  }
}
