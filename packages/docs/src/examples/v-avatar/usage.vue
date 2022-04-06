<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-avatar"
  >
    <v-defaults-provider
      :defaults="{
        VAvatar: {
          icon: model === 'icon' ? 'mdi-vuetify' : undefined,
          image: model !== 'icon' ? 'https://randomuser.me/api/portraits/women/75.jpg' : undefined,
          size: model === 'large' ? 'large' : undefined
        }
      }"
    >
      <div class="text-center">
        <v-avatar></v-avatar>
      </div>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VAvatarUsageExample',

    data: () => ({
      model: 'default',
      options: ['large', 'icon'],
    }),
  }
</script>
