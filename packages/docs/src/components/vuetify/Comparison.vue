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
            :class="!i && 'blue darken-4 font-weight-medium white--text rounded-t'"
            class="text-center text-no-wrap"
          >
            <div class="d-flex align-center justify-center text-body-2">
              <v-img
                v-if="framework.src"
                :src="framework.src"
                class="mr-2"
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
          <i18n
            :path="`comparison.${key}`"
            class="text--secondary text-left"
            tag="td"
          />

          <td
            v-for="(framework, j) in frameworks"
            :key="j"
            class="text-center"
            :class="[
              !j && 'green lighten-5',
              i === features.length - 1 && 'rounded-b'
            ]"
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
                :class="!j && 'green--text'"
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
      ],
    }),
  }
</script>
