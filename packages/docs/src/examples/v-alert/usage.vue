<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-alert"
  >
    <v-defaults-provider
      :defaults="{
        VAlert: {
          border: model === 'border',
          variant: model === 'elevated' ? 'elevated' : undefined,
        }
      }"
    >
      <v-alert
        v-model="alert"
        icon="mdi-vuetify"
        title="I'm an Alert Usage Example"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam earum, est illo quae fugit voluptatum fuga magni hic maiores ipsa, illum, tenetur accusamus cupiditate? Dolorem ad nisi eveniet officia voluptatibus."
      ></v-alert>
    </v-defaults-provider>

    <div
      v-if="!alert"
      class="d-flex justify-center"
    >
      <v-btn @click="alert= true">Reset Alert</v-btn>
    </div>
  </usage-example>
</template>

<script>
  export default {
    name: 'VAlertUsageExample',

    data: () => ({
      alert: true,
      model: 'default',
      options: ['elevated', 'border'],
    }),
  }
</script>
