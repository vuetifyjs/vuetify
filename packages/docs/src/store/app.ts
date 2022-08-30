// Utilities
import { defineStore } from 'pinia'

// Data
import data from '@/data/nav-alpha.json'

// Types
export type RootState = {
  drawer: boolean | null
}

type NavItem = {
  title?: string
  inactiveIcon?: string
  activeIcon?: string
  items?: NavItem[]
}

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    drawer: null,
    items: Array.from(data),
    pages: getPages(data as NavItem[]),
    settings: false,
    categories: {
      api: {
        icon: 'mdi-flask-outline',
        color: 'orange',
      },
      components: {
        icon: 'mdi-view-dashboard-outline',
        color: 'indigo-darken-1',
      },
      features: {
        icon: 'mdi-image-edit-outline',
        color: 'red',
      },
      directives: {
        icon: 'mdi-function',
        color: 'blue-grey',
      },
      'getting-started': {
        icon: 'mdi-speedometer',
        color: 'teal',
      },
      introduction: {
        icon: 'mdi-script-text-outline',
        color: 'green',
      },
      about: {
        icon: 'mdi-vuetify',
        color: 'primary',
      },
      resources: {
        icon: 'mdi-human-male-board',
        color: 'pink',
      },
      styles: {
        icon: 'mdi-palette-outline',
        color: 'deep-purple-accent-4',
      },
      themes: {
        icon: 'mdi-script-text-outline',
        color: 'pink',
      },
    },
  } as RootState),
})

function getPage (item: NavItem, parent = ''): string[] {
  const title = `${parent}${parent ? '/' : ''}${item?.title ?? item}`

  return item?.items?.length ? getPages(
    item.items,
    title
  ) : [title]
}

function getPages (items: NavItem[] = [], parent = ''): string[] {
  let array: any = []

  for (const item of items) {
    array = [...array, ...getPage(item, parent)]
  }

  return array
}
