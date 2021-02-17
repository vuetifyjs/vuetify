// Utilities
import { h, resolveComponent } from 'vue'
import { aliases as faAliases } from './fa'

// Types
import type { IconSet } from '@/composables/icons'

const aliases = faAliases

const fa: IconSet = {
  component: props => {
    const { icon, ...rest } = props
    const stringIcon = icon as string
    return h(props.tag, rest, [
      h(resolveComponent('font-awesome-icon'), {
        key: stringIcon, // TODO: https://github.com/FortAwesome/vue-fontawesome/issues/250
        icon: stringIcon.includes(' fa-') ? stringIcon.split(' fa-') : stringIcon,
      }),
    ])
  },
}

export { aliases, fa }
