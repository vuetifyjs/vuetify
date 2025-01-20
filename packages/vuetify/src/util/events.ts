// Utilities
import { isOn } from '@/util/helpers'

type EventHandler = (event: Event) => any

export function getPrefixedEventHandlers<T extends `:${string}`> (
  attrs: Record<string, any>,
  suffix: T,
  getData: EventHandler
): Record<`${string}${T}`, EventHandler> {
  return Object.keys(attrs)
    .filter(key => isOn(key) && key.endsWith(suffix))
    .reduce((acc: any, key) => {
      acc[key.slice(0, -suffix.length)] = (event: Event) => attrs[key](event, getData(event))
      return acc
    }, {} as Record<`${string}${T}`, EventHandler>)
}
