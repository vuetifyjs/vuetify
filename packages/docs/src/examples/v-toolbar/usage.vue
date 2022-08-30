<template>
  <usage-example
    v-model="model"
    v-model:tune-value="tuneModel"
    :options="options"
    :tune-options="tuneOptions"
    name="v-toolbar"
  >
    <v-responsive
      class="pa-4 mx-auto"
      max-width="740"
    >
      <v-toolbar
        :extended="tuneModel.extended"
        :border="model.prop === 'border'"
        :elevation="model.prop === 'elevation' ? model.value : undefined"
        :title="tuneModel.title"
        :density="tuneModel.density"
      >
      </v-toolbar>
    </v-responsive>
  </usage-example>
</template>

<script>
  export default {
    name: 'VToolbarUsageExample',

    data: () => ({
      model: 'default',
      options: [
        { label: 'Elevated', prop: 'elevation', value: 4 },
        { label: 'Bordered', prop: 'border', value: false },
      ],
      tuneModel: {
        collapse: false,
        density: 'default',
        title: 'Application',
      },
      tuneOptions: [
        { type: 'checkbox', prop: 'extended' },
        { type: 'text-field', prop: 'title' },
        { type: 'select', prop: 'density', items: ['default', 'comfortable', 'compact'] },
      ],
    }),
  }
</script>
