<template>
  <usage-example
    v-model="model"
    v-model:tune-value="tuneModel"
    :options="options"
    :tune-options="tuneOptions"
    name="v-text-field"
  >
    <v-responsive
      class="pa-4 mx-auto"
      max-width="360"
    >
      <v-text-field
        :variant="model.prop === 'variant' ? model.value : undefined"
        :label="tuneModel.label"
        :prepend-icon="tuneModel['prepend-icon'] ? 'mdi-vuetify' : undefined"
        :clearable="tuneModel.clearable"
      ></v-text-field>
    </v-responsive>
  </usage-example>
</template>

<script>
  export default {
    name: 'VTextFieldUsageExample',

    data: () => ({
      model: 'default',
      options: [
        { label: 'Outlined', prop: 'variant', value: 'outlined' },
        { label: 'Solo', prop: 'variant', value: 'solo' },
        { label: 'Underlined', prop: 'variant', value: 'underlined' },
      ],
      tuneModel: {
        label: 'Text field',
        'prepend-icon': false,
        clearable: false,
      },
      tuneOptions: [
        {
          type: 'text-field',
          prop: 'label',
        },
        {
          type: 'checkbox',
          prop: 'prepend-icon',
          value: 'mdi-vuetify',
        },
        {
          type: 'checkbox',
          prop: 'clearable',
        },
      ],
    }),
  }
</script>
