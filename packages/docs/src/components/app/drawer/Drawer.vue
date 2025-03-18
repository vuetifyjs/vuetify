<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="app.drawer"
    :expand-on-hover="railEnabled"
    :image="settings.suit['drawer']"
    :order="mobile ? -1 : undefined"
    :rail="railEnabled"
    width="300"
    @update:rail="onUpdateRail"
  >
    <AppDrawerPinnedItems :rail="rail" />

    <AppListList
      v-model:opened="opened"
      :items="app.items"
      nav
    >
      <template #divider>
        <v-divider class="my-3 mb-4 ms-10" />
      </template>
    </AppListList>

    <template #append>
      <AppDrawerAppend />
    </template>
  </v-navigation-drawer>
</template>

<script setup>
  // Composables
  import { scrollTo } from 'vuetify/lib/composables/goto'

  const app = useAppStore()
  const pins = usePinsStore()
  const settings = useSettingsStore()
  const user = useUserStore()

  const { mobile } = useDisplay()

  const rail = shallowRef(user.railDrawer)
  const _opened = shallowRef([])
  const opened = computed({
    get: () => rail.value ? [] : _opened.value,
    set: val => {
      if (pins.isPinning) return

      _opened.value = val
    },
  })
  const railEnabled = computed(() => user.railDrawer)

  // Restore scroll position when drawer is expanded
  let scrollingElement
  let lastScroll = 0
  watch(rail, val => {
    if (val) {
      lastScroll = scrollingElement.scrollTop
    } else {
      scrollTo(lastScroll, {
        container: scrollingElement,
      })
    }
  })

  watch(railEnabled, val => {
    rail.value = val
  })

  onMounted(async () => {
    scrollingElement = document.querySelector('#app-drawer .v-navigation-drawer__content')

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
