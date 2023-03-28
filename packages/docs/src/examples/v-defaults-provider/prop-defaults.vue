<template>
  <div>
    <v-card title="Title" subtitle="Subtitle" class="ma-10"></v-card>
    <v-defaults-provider :defaults="defaults">
      <v-card title="Title" subtitle="Subtitle" class="ma-10"></v-card>
    </v-defaults-provider>
  </div>
</template>

<script>
  export default {
    data: () => ({
      defaults: {
        global: {
          elevation: 10,
        },
        VCard: {
          color: 'secondary',
        },
      },
    }),
  }
</script>
