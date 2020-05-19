import Vue from 'vue'

export function createItemTypeNativeListeners (instance: Vue, itemTypeSuffix: string, value: any) {
  return Object.keys(instance.$listeners).reduce((on, eventName) => {
    if (eventName.endsWith(itemTypeSuffix)) {
      on[eventName.slice(0, -itemTypeSuffix.length)] = (event: Event) => instance.$emit(eventName, value, event)
    }

    return on
  }, {} as typeof instance.$listeners)
}

export function createItemTypeListeners (instance: Vue, itemTypeSuffix: string) {
  return Object.keys(instance.$listeners).reduce((on, eventName) => {
    if (eventName.endsWith(itemTypeSuffix)) {
      on[eventName] = instance.$listeners[eventName]
    }

    return on
  }, {} as typeof instance.$listeners)
}
