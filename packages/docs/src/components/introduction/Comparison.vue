<template>
  <v-sheet
    id="comparison"
    class="mb-5 text-body-2 mx-auto"
    border
    rounded
  >
    <v-table>
      <caption class="pa-4 text-h6">
        {{ t('comparison.caption', { year: (new Date()).getFullYear() }) }}
      </caption>

      <thead>
        <tr>
          <th>
            <strong class="text-h6">{{ t('features') }}</strong>
          </th>

          <th
            v-for="(framework, i) in frameworks"
            :key="i"
            class="text-center text-no-wrap"
          >
            <div class="d-flex align-center justify-center text-body-2">
              <v-img
                v-if="framework.src"
                :src="framework.src"
                class="me-2"
                contain
                height="24"
                max-width="24"
                width="24"
              />

              <div v-text="framework.name" />
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(key, i) in features"
          :key="i"
        >
          <td class="text--secondary text-start">{{ t(`comparison.${key}`) }}</td>

          <td
            v-for="(framework, j) in frameworks"
            :key="j"
            class="text-center"
          >
            <template v-if="framework[key]">
              <v-icon
                v-if="typeof framework[key] === 'boolean'"
                color="success"
              >
                mdi-record
              </v-icon>

              <span
                v-else-if="typeof framework[key] === 'string'"
                class="font-weight-light"
                v-text="framework[key]"
              />
            </template>
          </td>
        </tr>
      </tbody>

      <tfoot class="text-center">
        <tr>
          <td
            class="text-caption font-italic text-disabled"
            colspan="7"
          >
            <div>{{ t('comparison.average') }}</div>
          </td>
        </tr>
      </tfoot>
    </v-table>
  </v-sheet>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Types
  type Framework = {
    a11y?: boolean,
    enterprise?: boolean,
    lts?: boolean,
    name: string,
    release: string,
    rtl?: boolean,
    src: string,
    themes?: boolean,
    tree: string,
  }

  const features = [
    'a11y',
    'enterprise',
    'lts',
    'release',
    'rtl',
    'themes',
    'tree',
  ] as const

  const frameworks: Framework[] = [
    {
      a11y: true,
      enterprise: true,
      lts: true,
      name: 'Vuetify',
      release: 'Weekly',
      rtl: true,
      src: 'https://cdn.vuetifyjs.com/docs/images/frameworks/vuetify.svg',
      themes: true,
      tree: 'Automatic',
    },
    {
      a11y: true,
      name: 'BootstrapVue',
      release: 'Bi-Weekly',
      rtl: true,
      src: 'https://cdn.vuetifyjs.com/docs/images/frameworks/bootstrap-vue.svg',
      themes: true,
      tree: 'Manual',
    },
    {
      a11y: true,
      name: 'Buefy',
      release: 'Bi-Monthly',
      src: 'https://cdn.vuetifyjs.com/docs/images/frameworks/buefy.svg',
      tree: 'Manual',
    },
    {
      name: 'Element UI',
      release: 'Bi-Weekly',
      rtl: true,
      src: 'https://cdn.vuetifyjs.com/docs/images/frameworks/element-ui.svg',
      tree: 'Manual',
    },
    {
      name: 'Quasar',
      release: 'Bi-Weekly',
      rtl: true,
      src: 'https://cdn.vuetifyjs.com/docs/images/frameworks/quasar.svg',
      tree: 'Automatic',
    },
  ]

  const { t } = useI18n()
</script>
