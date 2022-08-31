<template>
  <usage-example
    v-model="model"
    v-model:tune-value="tuneModel"
    :options="options"
    :tune-options="tuneOptions"
    name="v-progress-linear"
  >
    <div class="text-center">
      <v-progress-linear
        v-model="tuneModel.value"
        :color="tuneModel['color'] ? 'blue-lighten-3' : undefined"
        :indeterminate="model.prop === 'indeterminate'"
        :height="tuneModel.height"
      ></v-progress-linear>
    </div>
  </usage-example>
</template>
<script>
  export default {
    name: 'ProgresslinearExample',

    data: () => ({
      model: 'default',
      options: [
        { prop: 'indeterminate', value: false },
      ],
      tuneModel: {
        color: false,
      },
      tuneOptions: [
        { type: 'checkbox', prop: 'color', value: 'blue-lighten-3' },
        { type: 'slider', prop: 'height', min: 4, max: 12 },
        { type: 'slider', prop: 'value' },
      ],
    }),
  }
</script>
