<template>
  <v-container class="d-flex justify-center">
    <v-avatar-group
      :items="items"
      border="md surface opacity-100"
    ></v-avatar-group>
  </v-container>
</template>

<script setup>
  const items = [
    { image: 'https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/3.jpg' },
    { image: 'https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/4.jpg' },
    { icon: 'mdi-account', color: 'info' },
    { text: 'JD', color: 'primary' },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { image: 'https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/3.jpg' },
        { image: 'https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/4.jpg' },
        { icon: 'mdi-account', color: 'info' },
        { text: 'JD', color: 'primary' },
      ],
    }),
  }
</script>
