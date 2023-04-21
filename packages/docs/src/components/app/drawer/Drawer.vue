<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="app.drawer"
    :order="mobile ? -1 : undefined"
    width="300"
  >
    <template #append>
      <v-divider />

      <div class="text-medium-emphasis text-caption py-2 px-3 d-flex align-center">
        <div class="d-inline-flex align-center">
          <v-icon icon="mdi-label" start />

          {{ t('latest-release') }}
        </div>

        <v-btn
          :to="rpath('/getting-started/release-notes/')"
          class="text-none px-2 ms-auto"
          density="compact"
          variant="text"
        >
          v{{ version }}

          <v-icon icon="mdi-page-next" size="xs" end />
        </v-btn>
      </div>
    </template>

    <app-list :items="app.items" nav>
      <template #divider>
        <v-divider class="my-3 mb-4 ms-16" />
      </template>
    </app-list>
  </v-navigation-drawer>
</template>

<script setup>
  // Components
  import AppList from '@/components/app/list/List.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { useDisplay, version } from 'vuetify'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { onMounted } from 'vue'
  import { rpath } from '@/util/routes'
  import { wait } from '@/util/helpers'

  const app = useAppStore()
  const { mobile } = useDisplay()
  const { t } = useI18n()

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
