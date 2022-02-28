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
      <v-layout
        class="elevation-2 rounded mx-auto bg-grey-lighten-4"
        style="max-width: 448px;"
      >
        <v-app-bar :model-value="model !== 'hidden'">
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

        <v-main>
          <div class="text-center py-12">
            <div class="text-h5">Content</div>
          </div>
        </v-main>
      </v-layout>
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
