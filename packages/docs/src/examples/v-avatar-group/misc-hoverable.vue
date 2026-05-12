<template>
  <v-sheet class="bg-indigo py-6 px-4">
    <v-avatar-group
      :gap="-8"
      :item-props="item => ({ image: item.avatarUrl })"
      :items="users"
      border="sm opacity-100"
      hoverable
      reverse
    >
      <template v-slot:item="{ props, index }">
        <v-avatar
          v-bind="props"
          rounded="lg"
          v-tooltip="{ text: `User #100${index}`, location: 'bottom' }"
        ></v-avatar>
      </template>
      <template v-slot:append>
        <v-chip text="+ 48,233"></v-chip>
      </template>
    </v-avatar-group>
  </v-sheet>
</template>

<script setup>
  const users = Array.from({ length: 7 })
    .map((_, i) => ({ avatarUrl: `https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/${i}.jpg` }))
</script>

<script>
  export default {
    data: () => ({
      users: Array.from({ length: 7 })
        .map((_, i) => ({ avatarUrl: `https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/${i}.jpg` })),
    }),
  }
</script>
