<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-badge"
  >
    <div class="text-center">
      <v-defaults-provider
        :defaults="{
          VBadge: {
            inline: model === 'inline',
            floating: model === 'floating',
          }
        }"
      >
        <v-badge overlap>
          <v-icon
            color="grey"
            icon="mdi-vuetify"
            size="x-large"
          ></v-icon>
        </v-badge>
      </v-defaults-provider>
    </div>
  </usage-example>
</template>

<script>
  export default {
    name: 'VBadgeUsageExample',

    data: () => ({
      badge: true,
      model: 'default',
      options: ['floating', 'inline'],
    }),
  }
</script>
