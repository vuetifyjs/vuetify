<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-system-bar"
  >
    <v-defaults-provider
      :defaults="{
        VSystemBar: {
          window: model === 'window',
        }
      }"
    >
      <v-layout
        class="elevation-2 rounded mx-auto bg-white"
        style="max-width: 448px; height: 150px"
      >
        <v-system-bar>
          <v-icon icon="mdi-wifi-strength-4"></v-icon>
          <v-icon icon="mdi-signal" class="ml-2"></v-icon>
          <v-icon icon="mdi-battery" class="ml-2"></v-icon>

          <span class="ml-2">3:13PM</span>
        </v-system-bar>

        <v-main></v-main>
      </v-layout>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VSystemBarUsageExample',

    data: () => ({
      model: 'default',
      options: ['window'],
    }),
  }
</script>
