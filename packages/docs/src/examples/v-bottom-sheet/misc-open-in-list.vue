<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-btn
          v-bind="props"
          color="purple"
          size="x-large"
          text="Click Me"
        ></v-btn>
      </div>
    </template>

    <v-list>
      <v-list-subheader>Open in</v-list-subheader>

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

<script>
  export default {
    data: () => ({
      sheet: false,
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
