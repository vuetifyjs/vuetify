<template>
  <v-dialog
    v-model="app.settings"
    :fullscreen="mobile"
  >
    <template #activator="{ props }">
      <slot name="activator" v-bind="{ props }" />
    </template>

    <v-card
      :min-height="mobile ? '100%' : 650"
      :rounded="mobile ? 0 : 'lg'"
      class="mx-auto"
      elevation="24"
      flat
      max-width="800"
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
        </v-navigation-drawer>

        <v-main>
          <v-container class="pt-2 h-100 overflow-y-auto">
            <h3 class="text-h6 mb-2">{{ record?.title }}</h3>

            <v-img
              v-if="record.hero"
              :src="`https://cdn.vuetifyjs.com/docs/images/settings/${record?.hero}.svg`"
              class="rounded-lg mb-4"
              cover
              height="125"
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
  import AboutVuetify from '@/components/app/settings/AboutVuetify.vue'
  import Api from '@/components/app/settings/Api.vue'
  import Code from '@/components/app/settings/Code.vue'
  import Options from '@/components/app/settings/Options.vue'
  import Theme from '@/components/app/settings/Theme.vue'

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
      component: Theme,
      icon: 'mdi-palette-outline',
      title: 'Custom themes',
      text: 'Customize your documentation experience with light and dark themes, as well as a combination of both named "mixed".',
    },
    {
      hero: 'api-tables',
      component: Api,
      icon: 'mdi-table',
      title: 'Inline API tables',
      text: 'Display API tables inline on documentation pages.',
    },
    {
      hero: 'code',
      component: Code,
      icon: 'mdi-puzzle-outline',
      title: 'Code display',
      text: 'Determines the script shown in code examples for components.',
    },
    {
      hero: 'options',
      component: Options,
      icon: 'mdi-cogs',
      title: 'Advanced options',
      text: 'Advanced options for customizing your documentation experience.',
    },
    {
      hero: 'about',
      component: AboutVuetify,
      icon: '$vuetify',
      title: 'About Vuetify',
      text: 'Information regarding Vuetify, including versioning, release notes, and more.',
    },
  ]
  const model = ref([0])
</script>
