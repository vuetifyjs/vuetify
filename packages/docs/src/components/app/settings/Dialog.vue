<template>
  <v-dialog
    v-model="app.settings"
    :fullscreen="mobile"
    max-width="800"
  >
    <v-card
      :min-height="mobile ? '100%' : 650"
      :rounded="mobile ? 0 : 'lg'"
      class="mx-auto"
      elevation="24"
      flat
      width="100%"
    >
      <v-toolbar color="primary" class="ps-3 pe-4">
        <v-icon icon="$vuetify" size="x-large" />

        <v-toolbar-title class="ms-2">
          Documentation settings
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          class="me-n2"
          icon="$close"
          size="x-small"
          variant="text"
          @click="app.settings = false"
        />
      </v-toolbar>

      <v-layout full-height>
        <v-navigation-drawer
          :location="mobile ? 'bottom' : undefined"
          permanent
          width="220"
          floating
        >
          <v-divider v-if="mobile" />

          <v-list
            v-model:selected="model"
            :lines="false"
            class="ps-0"
            color="primary"
            density="compact"
            mandatory
            nav
          >
            <template
              v-for="(item, index) in items"
              :key="item.title"
            >
              <v-list-item
                :ripple="false"
                :value="index"
                class="mb-1"
                rounded="s-0 e"
              >
                <template #prepend>
                  <v-icon
                    :icon="item.icon"
                    class="ms-2 me-4"
                    size="small"
                  />
                </template>

                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>

          <template #append>
            <developer-mode />
          </template>
        </v-navigation-drawer>

        <v-main>
          <v-container class="pt-2 h-100 overflow-y-auto">
            <h3 class="text-h6 mb-2">{{ record?.title }}</h3>

            <v-img
              v-if="record.hero"
              :height="mobile ? 100 : 220"
              :src="`https://cdn.vuetifyjs.com/docs/images/settings/${record?.hero}.svg`"
              class="rounded-lg mb-4"
              cover
            />

            <div class="text-body-2 mb-4">
              {{ record?.text }}
            </div>

            <v-divider class="mb-4" />

            <component :is="record?.component" />
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script setup>
  // Components
  import AppSettingsApi from '@/components/app/settings/Api.vue'
  import AppSettingsCode from '@/components/app/settings/Code.vue'
  // import AppSettingsRtl from '@/components/app/settings/Rtl.vue'
  import AppOptions from '@/components/app/settings/Options.vue'
  import AppSettingsTheme from '@/components/app/settings/Theme.vue'
  import DeveloperMode from '@/components/app/settings/DeveloperMode.vue'

  // Composables
  import { useDisplay } from 'vuetify'
  import { useAppStore } from '@/store/app'

  // Utilities
  import { computed, ref } from 'vue'

  const app = useAppStore()
  const { mobile } = useDisplay()

  const record = computed(() => items[model.value[0]])
  const items = [
    {
      hero: 'theme',
      component: AppSettingsTheme,
      icon: 'mdi-palette-outline',
      title: 'Custom themes',
      text: 'Customize your documentation experience with light and dark themes, as well as a combination of both named "mixed".',
    },
    {
      hero: 'api-tables',
      component: AppSettingsApi,
      icon: 'mdi-table',
      title: 'Inline API tables',
      text: 'Display API tables inline on documentation pages.',
    },
    {
      hero: 'code',
      component: AppSettingsCode,
      icon: 'mdi-puzzle-outline',
      title: 'Code display',
      text: 'Determines the script shown in code examples for components.',
    },
    // {
    //   component: AppSettingsRtl,
    //   icon: 'mdi-translate',
    //   title: 'Right-to-left orientation',
    //   text: 'Customize your documentation experience with light and dark themes, as well as a combination of both named "mixed".',
    // },
    {
      hero: 'about',
      component: AppOptions,
      icon: '$vuetify',
      title: 'About Vuetify',
      text: 'Information regarding Vuetify, including versioning, release notes, and more.',
    },
  ]
  const model = ref([0])
</script>
