import { VuetifyIcons } from 'vuetify/types/services/icons'
import { Component } from 'vue'
import icons from './fa'

export function convertToComponentDeclarations (
  component: Component | string,
  iconSet: VuetifyIcons,
) {
  const result: Partial<VuetifyIcons> = {}

  for (const key in iconSet) {
    result[key] = {
      component,
      props: {
        icon: (iconSet[key] as string).split(' fa-'),
      },
    }
  }

  return result as VuetifyIcons
}

export default convertToComponentDeclarations('font-awesome-icon', icons)
