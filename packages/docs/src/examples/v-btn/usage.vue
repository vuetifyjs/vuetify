<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-btn"
  >
    <div class="text-center">
      <v-defaults-provider
        :defaults="{
          VBtn: {
            prependIcon: model === 'prepend' ? 'mdi-vuetify' : undefined,
            appendIcon: model === 'append' ? 'mdi-account-circle' : undefined,
          }
        }"
      >
        <v-btn>
          Button text
        </v-btn>
      </v-defaults-provider>
    </div>
  </usage-example>
</template>

<script>
  export default {
    name: 'VBtnUsageExample',

    data: () => ({
      model: 'default',
      options: ['prepend', 'append'],
    }),
  }
</script>
