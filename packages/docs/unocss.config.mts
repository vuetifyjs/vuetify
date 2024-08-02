import { defineConfig, presetIcons }  from 'unocss'

/*
import type { StaticShortcut }  from 'unocss'
import nav from './src/data/nav.json' assert { type: 'json' }
import meta from '@mdi/svg/meta.json' assert { type: 'json' }

const safelist = new Set<string>()
const shortcuts = new Map<string, string>()
const regex = /^mdi-/

nav.forEach(item => {
  if (item.inactiveIcon) {
    if (item.inactiveIcon.match(regex))
      safelist.add(item.inactiveIcon.replace('mdi-', 'i-mdi:'))
    shortcuts.set(item.inactiveIcon, item.inactiveIcon.replace('mdi-', 'i-mdi:'))
  }
  if (item.activeIcon) {
    if (item.activeIcon.match(regex))
      safelist.add(item.activeIcon.replace('mdi-', 'i-mdi:'))
    shortcuts.set(item.activeIcon, item.activeIcon.replace('mdi-', 'i-mdi:'))
  }
})
meta.forEach((item: any) => {
  // safelist.add(item.name.replace('mdi-', 'i-mdi:'))
  shortcuts.set(`mdi-${item.name}`, `i-mdi:${item.name}`)
})

console.log(safelist)
console.log(shortcuts)
*/
export default defineConfig({
  /*safelist: Array.from(safelist),
  shortcuts: Array.from(Object.entries(shortcuts)).reduce<StaticShortcut[]>((acc, item) => {
    acc[item[0]] = item[1]
    return acc
  }, []),*/
  presets: [
    presetIcons({
      scale: 1.2,
    }),
  ]
})
