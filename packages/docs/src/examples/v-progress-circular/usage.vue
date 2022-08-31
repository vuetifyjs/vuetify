<template>
  <usage-example
    v-model="model"
    v-model:tune-value="tuneModel"
    :options="options"
    :tune-options="tuneOptions"
    name="v-progress-circular"
  >
    <div class="text-center">
      <v-progress-circular
        :color="tuneModel['color'] ? 'blue-lighten-3' : undefined"
        :indeterminate="model.prop === 'indeterminate'"
        :size="tuneModel.size"
        :width="tuneModel.width"
        model-value="20"
      ></v-progress-circular>
    </div>
  </usage-example>
</template>
<script>
  export default {
    name: 'ProgressCircularExample',

    data: () => ({
      model: 'default',
      options: [
        { prop: 'indeterminate', value: false },
      ],
      tuneModel: {
        color: false,
        size: 'default',
      },
      tuneOptions: [
        { type: 'checkbox', prop: 'color', value: 'blue-lighten-3' },
        {
          type: 'select',
          prop: 'size',
          items: ['x-small', 'small', 'default', 'large', 'x-large'],
        },
        { type: 'slider', prop: 'width', min: 4, max: 12 },
      ],
    }),
  }
</script>
