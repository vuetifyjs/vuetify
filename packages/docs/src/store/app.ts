import { defineStore } from 'pinia'

export type RootState = {
  drawer: boolean | null
}

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    drawer: null,
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
