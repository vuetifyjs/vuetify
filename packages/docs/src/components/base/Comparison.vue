<template>
  <v-card
    :elevation="value.elevation == null ? 12 : value.elevation"
    v-bind="value"
    class="pa-4"
  >
    <v-simple-table>
      <caption class="pa-4 title">
        Vue Framework Comparison {{ (new Date()).getFullYear() }}
      </caption>

      <thead>
        <tr>
          <th width="275px">
            <strong class="body-1 font-weight-bold">Features</strong>
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

              <strong
                class="body-2"
                v-text="framework.name"
              />
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(v, key, i) in features"
          :key="i"
        >
          <td
            class="body-1 grey--text text--darken-1 text-left"
            v-text="v"
          />

          <td
            v-for="(framework, j) in frameworks"
            :key="j"
            class="text-center"
          >
            <v-icon
              v-if="framework[key] && typeof framework[key] === 'boolean'"
              color="success"
            >
              mdi-check-bold
            </v-icon>

            <span
              v-else-if="typeof framework[key] === 'number'"
              class="body-1 font-weight-light"
            >
              {{ framework[key] }}+
            </span>

            <span
              v-else-if="typeof framework[key] === 'string'"
              class="body-2 font-weight-light"
              v-text="framework[key]"
            />
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {
    name: 'BaseComparison',

    props: {
      value: {
        type: Object,
        default: () => ({}),
      },
    },

    data: () => ({
      features: {
        components: 'Total components',
        a11y: 'Full Accessibility and Section 508 support',
        ssr: 'Server Side Rendering support',
        mobile: 'Mobile to desktop support',
        tree: 'Treeshaking',
        native: 'Native mobile support',
        rtl: 'RTL support',
        support: 'Consulting and Business support',
        enterprise: 'Enterprise support',
      },
      frameworks: [
        {
          name: 'Vuetify',
          src: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png',
          components: 82,
          tree: 'Automatic w/ vuetify-loader',
          mobile: true,
          ssr: true,
          a11y: true,
          rtl: true,
          enterprise: true,
          support: true,
        },
        {
          name: 'Vue Bootstrap',
          src: 'https://cdn.vuetifyjs.com/images/competitors/bootstrap-vue.png',
          components: 45,
          tree: 'Manual import',
          mobile: true,
          ssr: true,
          a11y: true,
          rtl: true,
        },
        {
          name: 'Element UI',
          src: 'https://cdn.vuetifyjs.com/images/competitors/element-ui.png',
          components: 86,
          tree: 'Manual import',
          ssr: true,
          rtl: true,
        },
        {
          name: 'Buefy',
          src: 'https://cdn.vuetifyjs.com/images/competitors/buefy.png',
          components: 41,
          tree: 'Manual import',
          mobile: true,
          a11y: true,
          ssr: true,
        },
        {
          name: 'Vue Material',
          src: 'https://cdn.vuetifyjs.com/images/competitors/vue-material.png',
          components: 56,
          tree: 'Manual import',
          mobile: true,
          ssr: true,
        },
        {
          name: 'Quasar Framework',
          src: 'https://cdn.vuetifyjs.com/images/competitors/quasar.png',
          components: 68,
          tree: 'Config and Manual import',
          mobile: true,
          native: true,
          ssr: true,
          rtl: true,
        },
      ],
    }),
  }
</script>
