<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-card"
  >
    <v-defaults-provider
      :defaults="{
        VCard: {
          variant: model === 'default' ? undefined : model,
        }
      }"
    >
      <v-card>
        <v-card-title>Card title</v-card-title>

        <v-card-subtitle>Subtitle text</v-card-subtitle>

        <v-card-text>
          Greyhound divisively hello coldly wonderfully marginally far upon excluding.
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-for="n in 2"
            :key="n"
            color="primary"
          >
            Action {{ n }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VCardUsageExample',

    data: () => ({
      model: 'default',
      options: ['contained-text', 'plain'],
    }),
  }
</script>
