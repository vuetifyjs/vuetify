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
    <app-list v-model:opened="opened" :items="app.items" nav>
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
  import { computed, onMounted, ref, watch } from 'vue'
  import { wait } from '@/util/helpers'
  import { useUserStore } from '@/store/user'

  const app = useAppStore()
  const user = useUserStore()

  const { mobile } = useDisplay()
  const theme = useTheme()

  const railEnabled = computed(() => user.railDrawer)

  const rail = ref(railEnabled.value)
  const _opened = ref([])
  const opened = computed({
    get: () => rail.value ? [] : _opened.value,
    set: val => {
      _opened.value = val
    },
  })

  watch(railEnabled, val => {
    rail.value = val
  })

  function onUpdateRail (val) {
    if (railEnabled.value) {
      rail.value = val
    }
  }

  const image = computed(() => {
    if (['dark', 'light'].includes(theme.name.value)) return undefined

    return `https://cdn.vuetifyjs.com/docs/images/themes/${theme.name.value}-app-drawer.png`
  })

  onMounted(async () => {
    await wait(1000)

    const element = document.querySelector('#app-drawer .v-list-item--active:not(.v-list-group__header)')

    if (!element) return

    element.scrollIntoView({
      block: 'center',
      inline: 'center',
    })
  })
</script>
