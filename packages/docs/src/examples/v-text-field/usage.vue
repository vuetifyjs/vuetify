<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-text-field"
  >
    <v-defaults-provider
      :defaults="{
        VTextField: {
          label: 'Label',
          variant: model === 'default' ? 'filled' : model
        }
      }"
    >
      <v-responsive class="pa-4 mx-auto" max-width="360">
        <v-text-field></v-text-field>
      </v-responsive>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VTextFieldUsageExample',

    data: () => ({
      model: 'default',
      options: ['outlined', 'solo'],
    }),
  }
</script>
