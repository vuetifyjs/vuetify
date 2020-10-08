<template>
  <v-sheet
    id="comparison"
    class="mb-12 text-body-2 mx-auto"
    max-width="1024"
    outlined
    rounded
  >
    <v-simple-table>
      <caption class="pa-4 text-h6">
        {{ $t('comparison.caption', { year: (new Date()).getFullYear() }) }}
      </caption>

      <thead>
        <tr>
          <th>
            <i18n
              class="text-h6"
              path="features"
              tag="strong"
            />
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
                class="mr-2"
                contain
                height="16"
                max-width="16"
                width="16"
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
          <i18n
            :path="`comparison.${key}`"
            class="text--secondary text-left"
            tag="td"
          />

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
                $mdiRecord
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
            class="text-caption font-italic text--disabled"
            colspan="7"
          >
            <i18n
              path="comparison.average"
              tag="div"
            />
          </td>
        </tr>
      </tfoot>
    </v-simple-table>
  </v-sheet>
</template>

<script>
  export default {
    name: 'VuetifyComparison',

    data: () => ({
      features: [
        'a11y',
        'enterprise',
        'lts',
        'release',
        'rtl',
        'themes',
        'tree',
      ],
      frameworks: [
        {
          a11y: true,
          enterprise: true,
          lts: true,
          name: 'Vuetify',
          release: 'Weekly',
          rtl: true,
          src: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png',
          themes: true,
          tree: 'Automatic',
        },
        {
          a11y: true,
          name: 'BootstrapVue',
          release: 'Bi-Weekly',
          rtl: true,
          src: 'https://cdn.vuetifyjs.com/images/competitors/bootstrap-vue.png',
          themes: true,
          tree: 'Manual',
        },
        {
          a11y: true,
          name: 'Buefy',
          release: 'Bi-Monthly',
          src: 'https://cdn.vuetifyjs.com/images/competitors/buefy.png',
          tree: 'Manual',
        },
        {
          name: 'Element UI',
          release: 'Bi-Weekly',
          rtl: true,
          src: 'https://cdn.vuetifyjs.com/images/competitors/element-ui.png',
          tree: 'Manual',
        },
        {
          name: 'Quasar',
          release: 'Bi-Weekly',
          rtl: true,
          src: 'https://cdn.vuetifyjs.com/images/competitors/quasar.png',
          tree: 'Automatic',
        },
      ],
    }),
  }
</script>
