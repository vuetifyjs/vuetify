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
            width="10%"
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

      <tfoot class="text-center">
        <tr>
          <td
            colspan="7"
            class="caption font-italic font-weight-light grey--text"
            style="height: auto;"
          >
            <div>
              **Based on average of all Major/Minor/Patch releases over the last 12 months.
            </div>
          </td>
        </tr>
      </tfoot>
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
        a11y: 'Full Accessibility and Section 508 support',
        ssr: 'Server Side Rendering support',
        lts: 'Long-term Support',
        release: 'Release cadence**',
        tree: 'Treeshaking',
        rtl: 'RTL support',
        themes: 'Premium Themes',
        enterprise: 'Business and Enterprise support',
      },
      frameworks: [
        {
          name: 'Vuetify',
          src: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png',
          tree: 'Automatic',
          release: 'Weekly',
          ssr: true,
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
          ssr: true,
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
          ssr: true,
        },
        {
          name: 'Element UI',
          src: 'https://cdn.vuetifyjs.com/images/competitors/element-ui.png',
          release: 'Bi-Weekly',
          tree: 'Manual',
          ssr: true,
          rtl: true,
        },
        {
          name: 'Vue Material',
          src: 'https://cdn.vuetifyjs.com/images/competitors/vue-material.png',
          release: 'Yearly',
          tree: 'Manual',
          ssr: true,
          themes: true,
        },
        {
          name: 'Quasar Framework',
          src: 'https://cdn.vuetifyjs.com/images/competitors/quasar.png',
          tree: 'Automatic',
          release: 'Bi-Weekly',
          ssr: true,
          rtl: true,
        },
      ],
    }),
  }
</script>
