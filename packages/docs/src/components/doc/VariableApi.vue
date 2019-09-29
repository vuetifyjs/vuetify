<template>
  <div>
    <doc-heading>Generic.Pages.variableApi</doc-heading>
    <doc-text>{{ value }}</doc-text>
    <v-card outlined>
      <v-toolbar
        class="px-2 py-3"
        color="primary"
        dark
        flat
        height="auto"
      >
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-autocomplete
              v-model="selectedComponent"
              :items="components"
              :class="$vuetify.breakpoint.mdAndUp ? '' : 'mb-6'"
              label="Available Component(s)"
              outlined
              :menu-props="{offsetY: true, contentClass: 'primary'}"
              prepend-inner-icon="mdi-view-dashboard"
              hide-details
            />
          </v-flex>
          <v-flex xs12 md4 offset-md4>
            <v-text-field
              v-model="search"
              type="search"
              clearable
              append-icon="mdi-magnify"
              label="Search..."
              outlined
              hide-details
              single-line
            />
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-data-iterator
        :search="search"
        :items="variables"
        sort-by="name"
        :items-per-page="-1"
        class="component-parameters"
        hide-default-footer
      >
        <template #default="{ items }">
          <div>
            <template v-for="(item, i) in items">
              <v-layout
                :key="`vapi-${i}`"
                class="api-item pa-2"
                wrap
              >
                <v-flex xs12>
                  <div
                    class="text-capitalize overline grey--text text--darken-3"
                    v-text="'name'"
                  />
                  <span
                    style="font-weight: medium; color: #d63200;"
                    v-text="item.name"
                  />
                </v-flex>
                <v-flex xs12>
                  <div
                    class="text-capitalize overline grey--text text--darken-3"
                    v-text="'default'"
                  />
                  <doc-markup
                    :filename="false"
                    lang="sass"
                    value="example"
                  >{{ item.default }}</doc-markup>
                </v-flex>
              </v-layout>
              <v-divider
                v-if="i + 1!== items.length"
                :key="`divider-${i}`"
              />
            </template>
          </div>
        </template>
      </v-data-iterator>
    </v-card>
  </div>
</template>

<script>
  // Utilities
  import variableApi from '@vuetify/api-generator/dist/variables'

  export default {
    props: {
      value: {
        type: String,
        default: undefined,
      },
    },

    data: vm => ({
      search: '',
      selectedComponent: '',
      variables: [],
    }),

    computed: {
      components () {
        console.log(variableApi)
        return Object.keys(variableApi) || []
      },
    },

    watch: {
      selectedComponent (component) {
        console.log(component)
        this.variables = (variableApi && variableApi[component])
          ? variableApi[component]
          : []
      },
    },
  }
</script>
