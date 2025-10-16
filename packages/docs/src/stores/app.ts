// Data
import data from '@/data/nav.json'

// Types
export type Category = {
  icon: string
  color: string
}

type RootState = {
  apiSearch: string
  drawer: boolean | null
  toc: boolean | null
  scrolling: boolean
  items: NavItem[]
  pages: string[]
  settings: boolean
  categories: Record<string, Category>
}

type NavItem = {
  divider?: boolean
  title?: string
  subheader?: string
  inactiveIcon?: string
  activeIcon?: string
  items?: NavItem[]
  emphasized?: boolean
}

export const useAppStore = defineStore('app', {
  state: () => ({
    apiSearch: '',
    drawer: null,
    toc: null,
    scrolling: false,
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
        icon: '$vuetify',
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
      labs: {
        icon: 'mdi-beaker-outline',
        color: 'purple',
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
    if (item?.divider || item?.subheader) continue

    array = [...array, ...getPage(item, parent)]
  }

  return array
}
