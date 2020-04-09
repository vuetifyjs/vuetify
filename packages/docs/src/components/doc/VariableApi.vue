<template>
  <section>
    <base-heading id="variable-api">Generic.Pages.variableApi</base-heading>

    <base-markdown>Customization.SassVariables.variableApiDesc</base-markdown>

    <v-card outlined>
      <v-toolbar
        class="px-2 py-3"
        color="primary"
        dark
        flat
        height="auto"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-autocomplete
              v-model="selectedComponent"
              :class="$vuetify.breakpoint.mdAndUp ? '' : 'mb-6'"
              :clearable="selectedComponent !== 'globals'"
              :items="components"
              :menu-props="{offsetY: true, contentClass: 'primary'}"
              label="Available Component(s)"
              hide-details
              outlined
              prepend-inner-icon="mdi-view-dashboard"
            />
          </v-col>

          <v-col
            cols="12"
            md="4"
            offset-md="4"
          >
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              clearable
              hide-details
              label="Search..."
              outlined
              single-line
              type="search"
            />
          </v-col>
        </v-row>
      </v-toolbar>

      <v-data-iterator
        :items="variables"
        :items-per-page="-1"
        :search="search"
        class="sass-var-iterator"
        hide-default-footer
        sort-by="name"
      >
        <template v-slot="{ items }">
          <div>
            <template v-for="(item, i) in items">
              <doc-api-item
                :key="item.name"
                :headers="headers"
                :item="item"
              />

              <v-divider
                v-if="i + 1!== items.length"
                :key="`divider-${i}`"
              />
            </template>
          </div>
        </template>
      </v-data-iterator>
    </v-card>
  </section>
</template>

<script>
  // Utilities
  import variableApi from '@vuetify/api-generator/dist/variables'

  export default {
    name: 'DocVariableApi',

    props: { value: String },

    data: () => ({
      components: [],
      search: '',
      selectedComponent: '',
      variables: [],
      headers: [
        {
          value: 'name',
          class: 'xs12',
        },
        {
          value: 'default',
          type: 'sass',
          class: 'xs12 mt-2',
        },
      ],
    }),

    watch: {
      selectedComponent (component) {
        if (!component) {
          this.selectedComponent = 'globals'
        } else {
          this.variables = (variableApi && variableApi[component]) || []
        }
      },
    },

    mounted () {
      this.components = Object.keys(variableApi) || []
      this.selectedComponent = 'globals'
    },
  }
</script>

<style lang="sass" scoped>
  .sass-var-iterator
    max-height: 800px
    overflow-y: scroll
</style>
