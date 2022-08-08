<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-toolbar"
  >
    <v-defaults-provider
      :defaults="{
        VToolbar: {
          variant: model === 'elevated' ? 'elevated' : undefined,
        }
      }"
    >
      <v-layout>
        <v-toolbar>
          <v-toolbar-title>Toolbar Title</v-toolbar-title>
        </v-toolbar>
      </v-layout>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VToolbarUsageExample',

    data: () => ({
      model: 'default',
      options: ['elevated'],
    }),
  }
</script>
