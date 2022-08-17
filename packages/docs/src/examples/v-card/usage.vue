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
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-card-item>
          <v-card-title>Card title</v-card-title>

          <v-card-subtitle>Subtitle text</v-card-subtitle>
        </v-card-item>

        <v-card-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam earum, est illo quae fugit voluptatum fuga magni hic maiores ipsa, illum, tenetur accusamus cupiditate? Dolorem ad nisi eveniet officia voluptatibus.
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-for="n in 2"
            :key="n"
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
      options: ['tonal', 'plain'],
    }),
  }
</script>
