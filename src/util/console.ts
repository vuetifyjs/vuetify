import { Vue } from 'vue/types/vue'

function createMessage (message: string, componentInstance?: Vue): string {
  const componentInfo = componentInstance ? ` in "${componentInstance.$options.name}"` : ''
  return `[Vuetify] ${message}${componentInfo}`
}

export function consoleWarn (message: string, componentInstance?: Vue): void {
  console.warn(createMessage(message, componentInstance))
}

export function consoleError (message: string, componentInstance?: Vue): void {
  console.error(createMessage(message, componentInstance))
}
