<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-app-bar"
  >
    <v-defaults-provider
      :defaults="{
        VAppBar: {
          collapse: model === 'collapse',
        }
      }"
    >
      <v-sheet color="surface-variant" class="pa-4 mx-auto" max-width="448" rounded>
        <v-layout>
          <v-app-bar :model-value="model !== 'hidden'" rounded="t">
            <template v-slot:prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Application Bar</v-app-bar-title>

            <template v-slot:append>
              <v-btn icon="mdi-heart"></v-btn>

              <v-btn icon="mdi-magnify"></v-btn>

              <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
          </v-app-bar>

          <v-main
            class="bg-surface rounded"
            style="height: 250px;"
          >
          </v-main>
        </v-layout>
      </v-sheet>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VAppBarUsageExample',

    data: () => ({
      model: 'default',
      options: ['collapse'],
    }),
  }
</script>
