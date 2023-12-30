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
    <app-list :items="pinned" nav class="mb-n4">
      <template #item="{ props: itemProps }">
        <v-hover>
          <template #default="{ props: activatorProps, isHovering }">
            <v-list-item
              :title="itemProps.title"
              :to="itemProps.to"
              v-bind="activatorProps"
              @click.prevent="onClickPin(itemProps.to)"
            >
              <template #append>
                <v-icon
                  v-if="isHovering"
                  icon="mdi-pin"
                  size="16"
                  class="me-1"
                  @click.prevent.stop="onClickPinRemove(itemProps)"
                />
              </template>
            </v-list-item>
          </template>
        </v-hover>
      </template>
    </app-list>

    <app-list v-model:opened="opened" :items="app.items" nav>
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
  import AppList from '@/components/app/list/List.vue'

  // Composables
  import { useDisplay, useTheme } from 'vuetify'
  import { useRoute, useRouter } from 'vue-router'

  // Utilities
  import { computed, onMounted, ref, shallowRef, watch } from 'vue'
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
  const route = useRoute()
  const router = useRouter()

  pins.load()

  const isPinning = shallowRef(false)
  const rail = ref(user.railDrawer)
  const _opened = ref([])
  const opened = computed({
    get: () => rail.value ? [] : _opened.value,
    set: val => {
      _opened.value = isPinning.value ? [] : val
    },
  })
  const pageIsPinned = computed(() => pins.pins.some(p => p.to === route.path))
  const railEnabled = computed(() => user.railDrawer)

  const pinned = computed(() => ([{
    activeIcon: 'mdi-pin',
    inactiveIcon: 'mdi-pin-outline',
    items: [
      ...pins.pins,
    ],
    title: 'Pinned',
  }]))

  const image = computed(() => {
    if (['dark', 'light'].includes(theme.name.value)) return undefined

    return `https://cdn.vuetifyjs.com/docs/images/themes/${theme.name.value}-app-drawer.png`
  })

  watch(railEnabled, val => {
    rail.value = val
  })

  watch(pageIsPinned, val => {
    if (val) _opened.value = []
  })

  onMounted(async () => {
    if (pageIsPinned.value) {
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

  async function onClickPin (to) {
    isPinning.value = true

    await router.replace(to)

    isPinning.value = false
  }

  function onClickPinRemove (pin) {
    pins.toggle(false, pin)
  }

  function onUpdateRail (val) {
    if (railEnabled.value) {
      rail.value = val
    }
  }
</script>
