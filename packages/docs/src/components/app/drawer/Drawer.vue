<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="app.drawer"
    :image="image"
    :order="mobile ? -1 : undefined"
    width="300"
  >
    <app-list :items="app.items" nav>
      <template #divider>
        <v-divider class="my-3 mb-4 ms-16" />
      </template>
    </app-list>

    <template #append>
      <app-drawer-append />
    </template>
  </v-navigation-drawer>
</template>

<script setup>
  // Components
  import AppDrawerAppend from './Append.vue'
  import AppList from '@/components/app/list/List.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { useDisplay, useTheme } from 'vuetify'

  // Utilities
  import { computed, onMounted } from 'vue'
  import { wait } from '@/util/helpers'

  const app = useAppStore()
  const { mobile } = useDisplay()
  const theme = useTheme()

  const image = computed(() => {
    if (['dark', 'light'].includes(theme.name.value)) return undefined

    return `https://cdn.vuetifyjs.com/docs/images/themes/${theme.name.value}-app-drawer.png`
  })

  onMounted(async () => {
    await wait(1000)

    const element = document.querySelector('#app-drawer .v-list-item--active:not(.v-list-group__header)')

    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
  })
</script>
