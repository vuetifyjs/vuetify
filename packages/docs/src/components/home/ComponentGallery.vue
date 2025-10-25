<template>
  <v-responsive class="py-16">
    <v-container class="pt-0">
      <HomeBgGradient />

      <h4 class="text-h4 font-weight-bold mb-5">
        Component Gallery
      </h4>

      <v-responsive class="mx-auto mb-5" max-width="700">
        <h6 class="text-h6 font-weight-regular text-medium-emphasis">
          Vuetify provides a comprehensive collection of components that can be used to build your application.
        </h6>
      </v-responsive>

      <div class="d-flex justify-center mb-10">
        <v-chip-group
          v-model="selectedComponent"
          class="d-flex justify-center"
          mandatory
        >
          <v-chip
            v-for="(_component, componentName) in components"
            :key="componentName"
            :value="componentName"
            class="px-5 mx-2"
            color="primary"
            size="large"
            variant="flat"
          >
            {{ componentName }}
          </v-chip>
        </v-chip-group>
      </div>

      <v-row align="start" class="text-left">
        <v-col
          v-for="component in components[selectedComponent]"
          :key="component.name"
          cols="12"
          md="4"
        >
          <v-card rounded="lg" variant="flat" width="100%" border>
            <v-card-title>
              {{ component.name }}
            </v-card-title>

            <v-card-text>
              <AppMarkup :code="component.html" class="rounded-lg bg-black" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const components: Record<string, { name: string; html: string }[]> = {
    Inputs: [
      {
        name: 'Text Field',
        html: '<v-text-field label="Name"></v-text-field>',
      },
      {
        name: 'Textarea',
        html: '<v-textarea label="Name"></v-textarea>',
      },
      {
        name: 'Select',
        html: '<v-select label="Choose"></v-select>',
      },
      {
        name: 'Checkbox',
        html: '<v-checkbox label="Agree"></v-checkbox>',
      },
      {
        name: 'Autocomplete',
        html: '<v-autocomplete label="Choose" :items="items"></v-autocomplete>',
      },
    ],
    Layouts: [
      {
        name: 'Container',
        html: '<v-container></v-container>',
      },
      {
        name: 'Grid Row',
        html: '<v-row></v-row>',
      },
      {
        name: 'Grid Column',
        html: '<v-col cols="12" md="4"></v-col>',
      },
    ],
    Navigation: [
      {
        name: 'App bars',
        html: '<v-app-bar>Click Me</v-app-bar>',
      },
      {
        name: 'Navigation Drawer',
        html: '<v-navigation-drawer></v-navigation-drawer>',
      },
      {
        name: 'Breadcrumbs',
        html: '<v-breadcrumbs :items="[\'Foo\', \'Bar\', \'Fizz\']"></v-breadcrumbs>',
      },
    ],
    Data: [
      {
        name: 'Data Table',
        html: '<v-data-table></v-data-table>',
      },
      {
        name: 'Data Iterator',
        html: '<v-data-iterator></v-data-iterator>',
      },
      {
        name: 'Infinite Scroller',
        html: '<v-infinite-scroller height="200" @load="loadMore"></v-infinite-scroller>',
      },
    ],
  }

  const selectedComponent = ref('Inputs')
</script>
