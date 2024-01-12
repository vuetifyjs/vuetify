<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="app.drawer"
    :rail="railEnabled"
    :expand-on-hover="railEnabled"
    :image="image"
    :order="mobile ? -1 : undefined"
    width="300"
    @update:rail="onUpdateRail"
  >
    <pinned-items />

    <app-list
      v-model:opened="opened"
      :items="app.items"
      nav
    >
      <template #divider>
        <v-divider class="my-3 mb-4 ms-10" />
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
  import PinnedItems from './PinnedItems.vue'

  // Composables
  import { useDisplay, useTheme } from 'vuetify'

  // Utilities
  import { computed, onMounted, ref, watch } from 'vue'
  import { wait } from '@/util/helpers'

  // Stores
  import { useAppStore } from '@/store/app'
  import { usePinsStore } from '@/store/pins'
  import { useUserStore } from '@vuetify/one'

  const app = useAppStore()
  const pins = usePinsStore()
  const user = useUserStore()

  const { mobile } = useDisplay()
  const theme = useTheme()

  const rail = ref(user.railDrawer)
  const _opened = ref([])
  const opened = computed({
    get: () => rail.value ? [] : _opened.value,
    set: val => {
      _opened.value = pins.isPinning ? [] : val
    },
  })
  const railEnabled = computed(() => user.railDrawer)

  const image = computed(() => {
    if (['dark', 'light'].includes(theme.name.value)) return undefined

    return `https://cdn.vuetifyjs.com/docs/images/themes/${theme.name.value}-app-drawer.png`
  })

  watch(railEnabled, val => {
    rail.value = val
  })

  onMounted(async () => {
    if (pins.pageIsPinned) {
      _opened.value = []

      return
    }

    await wait(1000)

    const element = document.querySelector('#app-drawer .v-list-item--active:not(.v-list-group__header)')

    if (!element) return

    element.scrollIntoView({
      block: 'center',
      inline: 'center',
    })
  })

  function onUpdateRail (val) {
    if (railEnabled.value) {
      rail.value = val
    }
  }
</script>
