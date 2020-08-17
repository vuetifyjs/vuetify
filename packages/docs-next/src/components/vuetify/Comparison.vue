<template>
  <v-sheet
    class="mb-12 text-body-2 mx-auto"
    max-width="1024"
    outlined
    rounded
  >
    <v-simple-table>
      <caption class="pa-4 text-h6">
        {{ $i18n.t('comparison.caption', { year: (new Date()).getFullYear() }) }}
      </caption>

      <thead>
        <tr>
          <th width="275px">
            <i18n
              tag="strong"
              class="text-body-1 font-weight-bold"
              path="features"
            />
          </th>

          <th
            v-for="(framework, i) in frameworks"
            :key="i"
            class="text-center text-no-wrap"
          >
            <div class="d-flex align-center justify-center">
              <v-img
                v-if="framework.src"
                :src="framework.src"
                class="mr-2"
                contain
                max-width="16"
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
            tag="td"
            class="text--secondary text-left"
            :path="`comparison.${key}`"
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
                $mdiCheckBold
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
            colspan="7"
            class="text-caption font-italic text--disabled"
          >
            <i18n
              tag="div"
              path="comparison.average"
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
          name: 'Vuetify',
          src: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png',
          tree: 'Automatic',
          release: 'Weekly',
          a11y: true,
          lts: true,
          rtl: true,
          enterprise: true,
          themes: true,
        },
        {
          name: 'BootstrapVue',
          release: 'Bi-Weekly',
          src: 'https://cdn.vuetifyjs.com/images/competitors/bootstrap-vue.png',
          tree: 'Manual',
          a11y: true,
          rtl: true,
          themes: true,
        },
        {
          name: 'Buefy',
          src: 'https://cdn.vuetifyjs.com/images/competitors/buefy.png',
          release: 'Bi-Monthly',
          tree: 'Manual',
          a11y: true,
        },
        {
          name: 'Element UI',
          src: 'https://cdn.vuetifyjs.com/images/competitors/element-ui.png',
          release: 'Bi-Weekly',
          tree: 'Manual',
          rtl: true,
        },
        {
          name: 'Quasar',
          src: 'https://cdn.vuetifyjs.com/images/competitors/quasar.png',
          tree: 'Automatic',
          release: 'Bi-Weekly',
          rtl: true,
        },
      ],
    }),
  }
</script>
