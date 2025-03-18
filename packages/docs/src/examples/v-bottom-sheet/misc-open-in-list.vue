<template>
  <v-bottom-sheet>
    <template v-slot:activator="{ props: activatorProps }">
      <div class="text-center pa-8">
        <v-btn
          v-bind="activatorProps"
          color="purple"
          size="x-large"
          text="Click Me"
        ></v-btn>
      </div>
    </template>

    <v-list>
      <v-list-subheader title="Open in"></v-list-subheader>

      <v-list-item
        v-for="tile in tiles"
        :key="tile.title"
        :prepend-avatar="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
        :title="tile.title"
        @click="sheet = false"
      ></v-list-item>
    </v-list>
  </v-bottom-sheet>
</template>

<script setup>
  const tiles = [
    { img: 'keep.png', title: 'Keep' },
    { img: 'inbox.png', title: 'Inbox' },
    { img: 'hangouts.png', title: 'Hangouts' },
    { img: 'messenger.png', title: 'Messenger' },
    { img: 'google.png', title: 'Google+' },
  ]
</script>

<script>
  export default {
    data: () => ({
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
    }),
  }
</script>
